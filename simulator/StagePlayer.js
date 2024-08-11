export default class StagePlayer {
  constructor(engine, strategy) {
    this.engine = engine;
    this.strategy = strategy;
  }

  play() {
    let state = this.engine.getInitialState();
    state = this.engine.startStage(state);

    let usedOrder = [];

    while (state.turnsRemaining > 0) {
      this.engine.logger.disable();
      const { scores, selectedCardId } = this.strategy.evaluate(state);
      this.engine.logger.enable();

      this.engine.logger.log("hand", {
        handCardIds: [...state.handCardIds],
        scores,
        selectedCardId: selectedCardId,
      });

      if (selectedCardId) {
        state = this.engine.useCard(state, selectedCardId);
        usedOrder.push(selectedCardId);
      } else {
        state = this.engine.endTurn(state);
      }
    }

    return {
      logs: this.engine.logger.logs,
      score: state.score,
    };
  }
}
