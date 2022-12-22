import CreateLink from './links/CreateLink'
// import { Inter } from '@next/font/google'


export default function Home() {
  return (
    <>
      <div>
      <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">Welcome to the Hello URLd URL shortener</h5>
      <h5 className="text-gray-900 text-l leading-tight font-medium mb-2">To get a new short URL, fill out the form:</h5>

        <CreateLink/>
        
      </div>
    </>
    
    
  )
}
