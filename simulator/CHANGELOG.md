# Contest Simulator Changelog

All notable changes to the contest simulator will be documented in this file.
Dates are based on Eastern Time Zone.

## 2024-09-15

### Changed

- Use same frequency estimate for all phases in card evaluation
- Recommended effect multipliers for good condition, concentration, good impression
- More accurate estimate of average type multiplier
- Evaluation of genki, good condition, perfect condition

## 2024-09-14

### Changed

- Consider other cards in the current hand when evaluating extra actions
- Recommended effect multipliers for good condition, concentration, and motivation
- Consider stamina when evaluating cards
- Evaluation of genki, good condition, perfect condition, concentration, and motivation
- Consider remaining turns in evaluation of half cost and double cost effects

### Removed

- Strategy update preview page for manual testing

## 2024-09-12

### Added

- Strategy update preview page for manual testing

## 2024-09-10

### Added

- Onsen China

## 2024-09-09

### Added

- Loadout history

### Fixed

- Effects added at start of turn no longer marked fresh

### Changed

- Mark unusable cards as unusable instead of -Infinity evaluation to avoid confusion

## 2024-09-06

### Added

- Skill card 切れた鼻緒が結んだ絆

## 2024-09-04

### Added

- Contest season 8 stages
- Show snapshot of effects in game state when user clicks ellipsis on hand log

### Fixed

- Stamina decrease trigger (affects 勝ちへのこだわり)

### Changed

- Combine one turn score buffs and permanent score buffs into a common format that tracks and decrements turn count
- Updated Kafe simulator URL to use updated API

## 2024-09-03

### Added

- Logging of effects set by p-items or cards in simulator logs

### Fixed

- Execution order of effects (score increases after buffs)

## 2024-09-02

### Added

- Preview of contest season 8 stages

### Changed

- Evaluation of extra actions considers total turn count
- Don't consider stamina in card evaluation

## 2024-08-31

### Added

- Shoshin Lilja, China, and Rinami
- Onsen Rinami

## 2024-08-29

### Changed

- Evaluation of effects using generic estimated value instead of fully simulating, improving performance
- Evaluation of genki

## 2024-08-28

### Added

- Memory selector modal in loadout skill card groups

## 2024-08-27

### Changed

- Assign value to extra actions only when 1 action remaining

## 2024-08-26

### Fixed

- Errors when deck and discards are empty when drawing card

### Changed

- Evaluation of extra actions

## 2024-08-24

### Changed

- Recommended effect multipliers for concentration and motivation
- Evaluation of extra actions, cards in hand, cards removed, stamina, genki, half cost turns

## 2024-08-23

### Added

- Graph average values of stats at the start of each turn
- Graph distribution in box plot

### Changed

- Frequency estimates of each game phase for evaluation of effects
- Recommended effect multipliers for good condition and concentration

## 2024-08-21

### Added

- Hibi China

### Fixed

- Order of operations when evaluating expressions in effects

## 2024-08-20

### Fixed

- Set initial value of `nullifyDebuff` to avoid `NaN` when operating on it
- Deck shuffling
- Don't apply concentration to non-positive score changes
- Fixed stamina changes for cards with stamina increase effects
- Limit for お嬢様の晴れ舞台, ワンモアステップ, 本気の趣, 距離感

## 2024-08-19

### Added

- Contest season 7 stages
- Cost increase effect

### Fixed

- log(0) in heuristic strategy when stamina is 0
- Apply cost reduction to direct stamina cost
- Use type multipliers when generating Kafe simulator URL

## 2024-08-18

### Added

- Stage customization

## 2024-08-17

### Fixed

- Generate random turn order on every run
- Perfect conditon effect

## 2024-08-15

### Added

- Support bonus

## 2024-08-14

### Fixed

- Miwaku no performance effect limit

## 2024-08-12

### Fixed

- Reset card uses remaining at end of turn
- Minus operator
- Edge case when card effect has no action
- Kamurogiku Kotone recommended effect

## 2024-08-11

### Changed

- Set up web workers on mount to improve performance

## 2024-08-10

### Added

- Kamurogiku Kotone
- Ubugoe Saki, Temari, Kotone

### Changed

- Parallelize simulation runs using web workers

## 2024-08-09

### Added

- Simulator logs
- Heuristic strategy

### Fixed

- Type of ポーズの基本
- Effect of 国民的アイドル
- Effect of なに聴いてるの？
- Effect of はじける水しぶ
- Effects of contest stages 1-2, 4-1, 5-1, 6-1

## 2024-08-08

### Added

- Simulator implementation
- Distribution plot