import { Category, Difficulty } from "../types/OpenTDBTypes"

export const difficulties: Difficulty[] = [
  { label: 'Any', value: '' },
  { label: 'Easy', value: 'easy' },
  { label: 'Medium', value: 'medium' },
  { label: 'Hard', value: 'hard' }
]

// More categories exist but not used -> https://opentdb.com/api_category.php
export const categories: Category[] = [
  { label: 'Any', value: 0 },
  { label: 'General Knowledge', value: 9 },
  { label: 'Books', value: 10 },
  { label: 'Film', value: 11 },
  { label: 'Music', value: 12 },
  { label: 'Television', value: 14 },
  { label: 'Video Games', value: 15 },
  { label: 'Science & Nature', value: 17 },
  { label: 'Computers', value: 18 },
  { label: 'Sports', value: 21 },
  { label: 'History', value: 23 },
  { label: 'Animals', value: 27 }
]