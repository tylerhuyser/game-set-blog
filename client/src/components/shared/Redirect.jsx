import React from 'react'
import { Navigate, useParams } from 'react-router-dom';

export default function Redirect() {
  const { id, year, month, date, slug } = useParams();
  console.log(`id: ${id}`)
  console.log(`year: ${year}`)
  console.log(`month: ${month}`)
  console.log(`date: ${date}`)
  console.log(`slug: ${slug}`)
  return <Navigate to={`/posts/${slug}`} replace />
}