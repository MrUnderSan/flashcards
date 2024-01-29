import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { Grade } from '@/common/types'
import { LearnCard } from '@/components/learnCard'
import { Page } from '@/components/page'
import { BackButton } from '@/components/ui/backButton'
import { useGetOneDeckQuery, useGetRandomCardQuery, useGradeCardMutation } from '@/services'

export const Learn = () => {
  const params = useParams()
  const id = params.id as string
  const { currentData: deck } = useGetOneDeckQuery({ id })
  const { currentData: randomCard } = useGetRandomCardQuery({ id })
  const [card, setCard] = useState(randomCard)

  const [gradeCard] = useGradeCardMutation()

  useEffect(() => {
    if (randomCard) {
      setCard(randomCard)
    }
  }, [randomCard])

  const onSubmit = async (data: Grade) => {
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
      }
    }
  }

  return (
    <Page marginTop={'24px'}>
      <BackButton text={'Back to Decks List'} />
      {deck && card && <LearnCard card={card} deckName={deck.name} onSubmit={onSubmit} />}
    </Page>
  )
}
