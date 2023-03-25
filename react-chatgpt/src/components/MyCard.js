import React from 'react'
import Card from 'react-bootstrap/Card';

export default function MyCard({response, question}) {
  return (
    <>
    <Card
          bg={'light'}
          key={'light'}
          text={'dark'}
          style={{ width: '25rem' }}
          className="mb-2 cardgpt"
        >
          <Card.Header>{question}</Card.Header>
          <Card.Body>
            <Card.Text>
              {response}
            </Card.Text>
          </Card.Body>
    </Card>
  </>
  )
}
