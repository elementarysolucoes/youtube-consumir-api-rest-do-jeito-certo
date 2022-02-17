import axios from 'axios'
import type { NextPage } from 'next'
import Link from 'next/link'
import { useQuery } from 'react-query'
//import { useFetch } from '../hooks/useFetch'
import { IRepository } from '../types'

const Home: NextPage = () => {
  
  //const { fetchedData: repos, isFetching } = useFetch<IRepository[]>('diego3g/repos');
  const { data: repos, isFetching} = useQuery<IRepository[]>('repos', async () => {
    const response = await axios.get('https://api.github.com/users/diego3g/repos')
    return response.data
  },{
    staleTime: 1000 * 60 // 1 minute
  })

  return (
    <ul>
      {isFetching && <p>Carregando...</p>}
      {repos?.map(repo => {
        return(
          <li key={repo.id}>  
          <Link href={`/repo/${repo.id}`}>
            <a><strong>{repo.name}</strong></a>
          </Link>          
            
            <p>{repo.description}</p>
          </li>
        )
      })}
    </ul>
  )
}

export default Home
