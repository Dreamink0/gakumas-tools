import { PIdols, PItems, SkillCards } from "gakumas-data";

const PHASE_FREQUENCY_ESTIMATES = {
  startOfStage: 0,
  startOfTurn: 1,
  cardUsed: 0.5,
  activeCardUsed: 0.2,
  mentalCardUsed: 0.3,
  afterCardUsed: 0.5,
  afterActiveCardUsed: 0.2,
  afterMentalCardUsed: 0.3,
  endOfTurn: 1,
  goodImpressionTurnsIncreased: 0.2,
  motivationIncreased: 0.2,
  goodConditionTurnsIncreased: 0.2,
  concentrationIncreased: 0.2,
};

export default class HeuristicStrategy {
  constructor(engine) {
    this.engine = engine;
    this.recommendedEffect = this.inferRecommendedEffect(
      this.engine.idolConfig.pItemIds,
      this.engine.idolConfig.skillCardIds
    );
  }

  inferRecommendedEffect(pItemIds, skillCardIds) {
    const signaturePItem = pItemIds
      .map(PItems.getById)
      .find((p) => p?.sourceType == "pIdol");
    if (signaturePItem)
      return PIdols.getById(signaturePItem.pIdolId).recommendedEffect;
    const signatureSkillCard = skillCardIds
      .map(SkillCards.getById)
      .find((s) => s?.sourceType == "pIdol");
    if (signatureSkillCard)
      return PIdols.getById(signatureSkillCard.pIdolId).recommendedEffect;
    return null;
  }

  chooseCard(state) {
    this.engine.logger.disabled = true;
    const heuristicScores = state.handCardIds.map((id) =>
      this.getHeuristicScore(state, id)
    );
    this.engine.logger.disabled = false;

    let cardToUse = null;
    const maxHeuristicScore = Math.max(...heuristicScores);
    if (maxHeuristicScore > 0) {
      const maxIndex = heuristicScores.indexOf(maxHeuristicScore);
      cardToUse = state.handCardIds[maxIndex];
    }

    this.engine.logger.log("hand", {
      handCardIds: [...state.handCardIds],
      scores: heuristicScores,
      selectedCardId: cardToUse,
    });

    return cardToUse;
  }

  getHeuristicScore(prevState, cardId) {
    if (!this.engine.isCardUsable(prevState, cardId)) {
      return -Infinity;
    }

    let state = JSON.parse(JSON.stringify(prevState));
    state = this.engine.useCard(state, cardId);

    // Predict score after effects
    state.effects.forEach((effect) => {
      const limit = Math.ceil(
        Math.min(effect.limit || state.turnsRemaining, state.turnsRemaining) *
          PHASE_FREQUENCY_ESTIMATES[effect.phase]
      );
      for (let i = 0; i < limit; i++) {
        state = this.engine._triggerEffects(
          [{ ...effect, phase: null }],
          state
        );
      }
    });

    const { vocal, dance, visual } = this.engine.idolConfig.typeMultipliers;
    const averageTypeMultiplier = (vocal + dance + visual) / 3;

    const getTrueScore = (score) => {
      return this.engine._calculateTrueScore(
        score,
        state,
        averageTypeMultiplier
      );
    };

    const recommendedEffect = this.engine.idolConfig.recommendedEffect;
    const goodConditionTurnsMultiplier =
      recommendedEffect == "goodConditionTurns" ? 5 : 1;
    const concentrationMultiplier =
      recommendedEffect == "concentration" ? 4 : 1;
    const goodImpressionTurnsMultiplier =
      recommendedEffect == "goodImpressionTurns" ? 3 : 1;
    const motivationMultiplier = recommendedEffect == "motivation" ? 5 : 1;

    let score = 0;

    // Turns remaining
    score += state.turnsRemaining == prevState.turnsRemaining ? 1000 : 0;

    // Card uses remaining
    score += state.cardUsesRemaining * 50;

    // Stamina
    score += (Math.log(state.stamina) / (state.turnsRemaining + 1)) * 0.5;

    // Genki
    score +=
      (state.genki /
        (Math.pow(
          state.turnsRemaining - this.engine.stageConfig.turnCount / 2,
          2
        ) +
          2)) *
      3 *
      motivationMultiplier;

    // Good condition turns
    score +=
      Math.min(state.goodConditionTurns, state.turnsRemaining) *
      4.5 *
      goodConditionTurnsMultiplier;

    // Perfect condition turns
    score +=
      Math.min(state.perfectConditionTurns, state.turnsRemaining) *
      state.goodConditionTurns *
      goodConditionTurnsMultiplier;

    // Concentration
    score +=
      state.concentration * state.turnsRemaining * concentrationMultiplier;

    // Good impression turns
    score +=
      state.goodImpressionTurns *
      state.turnsRemaining *
      1.5 *
      goodImpressionTurnsMultiplier;

    // Motivation
    score +=
      state.motivation * state.turnsRemaining * 0.5 * motivationMultiplier;

    // One turn score buff
    score += state.oneTurnScoreBuff * 20;

    // Permament score buff
    score += state.permanentScoreBuff * state.turnsRemaining * 20;

    // Half cost turns
    score += state.halfCostTurns * 4.5;

    // Double cost turns
    score += state.doubleCostTurns * -9;

    // Cost reduction
    score += state.costReduction * state.turnsRemaining * 2;

    // Double card effect cards
    score += state.doubleCardEffectCards * 9;

    // Nullify genki turns
    score += state.nullifyGenkiTurns * -9;

    return Math.floor(
      getTrueScore(score) +
        state.score +
        state.score / (state.turnsRemaining + 1)
    );
  }
}
