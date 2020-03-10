import React from 'react'
import SampleCard from '../components/SampleCard'
import KarolCard from '../components/Authors/KarolCard'

// on merging replace mock data coresponding to your id with your AuthorAbout component

function switchAuthors (id) {
  const authors = {
    1: <SampleCard />,
    2: 'author2 component',
    3: 'author3 component',
    4: 'author4 component',
    5: <KarolCard />
  }
  return authors[id] || 'not existing author'
}

export default function AuthorPage (props) {
  return (
    switchAuthors(props.match.params.id)
  )
}
