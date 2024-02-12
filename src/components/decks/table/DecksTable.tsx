import { Link } from 'react-router-dom'

import { Edit, Play, Trash } from '@/assets'
import { ROUTES } from '@/common/enums'
import { getLocaleDateString } from '@/common/utils'
import { DecksTableWithSkeleton } from '@/components/decks/table/DecksTableWithSkeleton'
import { DecksTableProps, columns } from '@/components/decks/table/decksTable.types'
import { DeleteDeckModal } from '@/components/modals/decks/deleteDeckModal/DeleteDeckModal'
import { EditDeckModal } from '@/components/modals/decks/editModal/EditDeckModal'
import { TableSortHeader } from '@/components/tableSortHeader'
import { Button } from '@/components/ui/button'
import { Table } from '@/components/ui/table'
import { Typography } from '@/components/ui/typography'

import s from './decksTable.module.scss'

const { Body, Cell, Root, Row } = Table

export const DecksTable = ({ currentUserId, decks, isLoading, onSort, sort }: DecksTableProps) => {
  return (
    <Root>
      <TableSortHeader columns={columns} onSort={onSort} sort={sort} />
      <Body>
        {isLoading ? (
          <DecksTableWithSkeleton />
        ) : (
          decks?.map(deck => (
            <Row key={deck.id}>
              <Cell col={'3'}>
                {deck.cover && <img alt={''} className={s.img} src={deck.cover} />}
                <Typography as={Link} className={s.link} to={`/decks/${deck.id}`} variant={'body2'}>
                  {deck.name}
                </Typography>
              </Cell>
              <Cell col={'1'}>{deck.cardsCount}</Cell>
              <Cell col={'2'}>{getLocaleDateString(deck.updated)}</Cell>
              <Cell col={'3'}>{deck.author.name}</Cell>
              <Cell col={'1'}>
                <div className={s.buttons}>
                  {deck.cardsCount > 0 && (
                    <Button
                      as={Link}
                      to={`${ROUTES.DECKS}/${deck.id}${ROUTES.LEARN}`}
                      variant={'icon'}
                    >
                      <Play />
                    </Button>
                  )}

                  {deck.author.id === currentUserId && (
                    <>
                      <DeleteDeckModal
                        id={deck.id}
                        name={deck.name}
                        trigger={
                          <Button variant={'icon'}>
                            <Trash />
                          </Button>
                        }
                      />
                      <EditDeckModal
                        deck={deck}
                        trigger={
                          <Button variant={'icon'}>
                            <Edit />
                          </Button>
                        }
                      />
                    </>
                  )}
                </div>
              </Cell>
            </Row>
          ))
        )}
      </Body>
    </Root>
  )
}
