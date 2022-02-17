import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useQueryClient } from "react-query"
import { IRepository } from "../../types"

const Repo = () => {

  const [repoSelected, setRepoSelected] = useState<IRepository | undefined>()
  
  const router = useRouter()
  const queryClient = useQueryClient();
  
  useEffect(() => {
    
    const { id } = router.query 
    //Aqui seria um GET na API com o ID do repositório
    const repository = queryClient.getQueryData<IRepository[]>(['repos'])?.filter((repo) => repo.id === Number(id))[0]

    setRepoSelected(repository)
  },[])
     
  const handleChangeRepo = async () => {
    //await queryClient.invalidateQueries(['repos'])
    
    const previousRepos = queryClient.getQueryData<IRepository[]>(['repos'])  
    
    // Aqui teria a chamada API para atualizar a descrição do respositório
    
    if(previousRepos){

      const nextRepos = previousRepos.map(prevRepo => {
        if(prevRepo.id === repoSelected?.id && prevRepo !== repoSelected){
          return repoSelected
        } else {
          return prevRepo
        }
      })

      queryClient.setQueriesData('repos', nextRepos)
    }

    router.push('/')
  }
  
  return(
    <div>
      <h1>{repoSelected?.name}</h1>
      <textarea defaultValue={repoSelected?.description} onChange={(e) => setRepoSelected({...repoSelected, description: e.target.value })}/>
      <br />
      <button type="button" onClick={handleChangeRepo}>
        Salvar
      </button>
    </div>
    
  )
}

export default Repo