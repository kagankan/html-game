import type { ElementName } from "./constants";
import { uuid } from "./id";

/** 手札 */
type Hand = readonly Readonly<{ element: ElementName; id: string }>[];

type Match = Readonly<{
  /** 場に出されたカード */
  field: readonly ElementName[];
  /** プレイヤーの手札 */
  players: readonly Hand[];
  /** 捨て札 */
  trash: readonly ElementName[];
}>;

export const startMatch = (
  deck: readonly ElementName[],
  playerCount: number,
): Match => {
  const shuffled = shuffle(deck);
  const hands = deal(shuffled, playerCount);
  return {
    field: [],
    trash: [],
    players: hands.map((hand) =>
      hand.map((element) => ({ element, id: uuid() })),
    ),
  };
};

const shuffle = <T>(array: readonly T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

// カードを人数分に配る
export const deal = <T>(cards: readonly T[], playerCount: number): T[][] => {
  if (cards.length < playerCount) {
    console.log(cards.length, playerCount);
    throw new Error("カードが足りません");
  }
  const hands: T[][] = cards.reduce<T[][]>((acc, card, index) => {
    const playerIndex = index % playerCount;
    if (!acc[playerIndex]) {
      acc[playerIndex] = [];
    }
    acc[playerIndex].push(card);
    return acc;
  }, []);

  return hands;
};
