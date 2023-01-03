import CreateLink from './components/CreateLink'

export default function Home() {
  return (
    <>
      <div>
        <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2 dark:text-gray-100">Welcome to the Hello URLd URL shortener</h5>
        <h5 className="text-gray-900 text-l leading-tight font-medium mb-2 dark:text-gray-100">To get a new short URL, fill out the form:</h5>
        <CreateLink/>       
      </div>
    </>
  )
}