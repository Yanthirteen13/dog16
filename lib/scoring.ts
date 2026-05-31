import { QUESTIONS, type Dimension } from "./questions";
import type {
  DimensionResult,
  DimensionScores,
  Letter,
  TypeCode,
} from "./types";

export type Choice = "A" | "B" | "C" | "D";
export type AnswerMap = Record<number, Choice>;

const DIM_LETTERS: Record<Dimension, { left: Letter; right: Letter }> = {
  EI: { left: "E", right: "I" },
  SN: { left: "S", right: "N" },
  TF: { left: "T", right: "F" },
  JP: { left: "J", right: "P" },
};

// On a tie, lean toward the more shareable side (E / N / F / P).
const TIE_PREFERENCE: Record<Dimension, Letter> = {
  EI: "E",
  SN: "N",
  TF: "F",
  JP: "P",
};

const LEFT_POINTS: Record<Choice, number> = { A: 2, B: 1, C: 0, D: 0 };
const RIGHT_POINTS: Record<Choice, number> = { A: 0, B: 0, C: 1, D: 2 };

const MAX_RAW = 12; // 6 questions x 2 points

export interface ScoreResult {
  dimension_scores: DimensionScores;
  dimension_result: DimensionResult;
  type_code: TypeCode;
}

export function scoreAnswers(answers: AnswerMap): ScoreResult {
  const rawLeft: Partial<Record<Dimension, number>> = {};
  const rawRight: Partial<Record<Dimension, number>> = {};

  for (const q of QUESTIONS) {
    const choice = answers[q.id];
    if (!choice) continue;
    rawLeft[q.dimension] = (rawLeft[q.dimension] ?? 0) + LEFT_POINTS[choice];
    rawRight[q.dimension] = (rawRight[q.dimension] ?? 0) + RIGHT_POINTS[choice];
  }

  const toScore = (raw: number) => Math.round((raw / MAX_RAW) * 100);

  const dimension_scores = {} as DimensionScores;
  const dimension_result = {} as DimensionResult;

  (Object.keys(DIM_LETTERS) as Dimension[]).forEach((dim) => {
    const { left, right } = DIM_LETTERS[dim];
    const leftScore = toScore(rawLeft[dim] ?? 0);
    const rightScore = toScore(rawRight[dim] ?? 0);
    dimension_scores[left] = leftScore;
    dimension_scores[right] = rightScore;

    let winner: Letter;
    if (leftScore > rightScore) winner = left;
    else if (rightScore > leftScore) winner = right;
    else winner = TIE_PREFERENCE[dim];

    dimension_result[dim] = winner as never;
  });

  const type_code =
    `${dimension_result.EI}${dimension_result.SN}${dimension_result.TF}${dimension_result.JP}` as TypeCode;

  return { dimension_scores, dimension_result, type_code };
}
