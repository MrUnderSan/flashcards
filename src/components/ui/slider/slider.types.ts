export type SliderProps = {
  max?: number
  min?: number
  minStepsBetweenThumbs?: number
  onValueChange: (values: number[]) => void
  step?: number
  value: number[]
}
