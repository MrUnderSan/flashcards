import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { Grade } from '@/common/types'
import { LearnCard } from '@/components/learnCard'
import { Page } from '@/components/page'
import { BackButton } from '@/components/ui/backButton'
import { Loader } from '@/components/ui/loader'
import { useGetOneDeckQuery, useGetRandomCardQuery, useGradeCardMutation } from '@/services'

export const Learn = () => {
  const params = useParams()
  const id = params.id as string
  const { currentData: deck, isLoading: deckIsLoading } = useGetOneDeckQuery({ id })
  const { currentData: randomCard, isLoading: randomCardIsLoading } = useGetRandomCardQuery({ id })
  const [card, setCard] = useState(randomCard)

  const [gradeCard, { isLoading: gradeCardIsLoading }] = useGradeCardMutation()

  useEffect(() => {
    if (randomCard) {
      setCard(randomCard)
    }
  }, [randomCard])

  const isLoading = deckIsLoading || randomCardIsLoading || gradeCardIsLoading

  const onSubmit = async (data: Grade, changeRateMode: any) => {
    if (card) {
      const res = await gradeCard({
        args: {
          cardId: card.id,
          grade: Number(data.grade),
        },
        id,
      }).unwrap()

      if (res) {
        setCard(res)
        changeRateMode(false)
      }
    }
  }

  return (
    <Page marginTop={'24px'}>
      <BackButton text={'Back to Decks List'} />
      {deck && card && <LearnCard card={card} deckName={deck.name} onSubmit={onSubmit} />}
      {isLoading && <Loader />}
    </Page>
  )
}
