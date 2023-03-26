import React from 'react'
import Card from 'react-bootstrap/Card';

export default function MyCard({color,response, question}) {
  return (
    <>
    <Card
          bg={color==="green"?'success':'light'}
          key={color==="green"?'success':'light'}
          text={color==="green"?'light':'dark'}
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
