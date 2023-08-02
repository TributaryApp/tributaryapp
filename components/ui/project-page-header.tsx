import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { buttonVariants } from "@/components/ui/button"
import StreamSetup from './widget'


export default function ProjectPageHeader(projectData:any) {
  console.log(projectData)
  return (
    <div>
      <div>
        <Image className="h-32 w-full object-cover lg:h-48" src={`https://picsum.photos/seed/${projectData.name}/2500`} width={1000} height={1000} alt="" />
      </div>
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
          <div className="flex">
            <Image className="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32" src={`https://picsum.photos/seed/${projectData.created_by}/200/300`} width={300} height={300} alt="" />
          </div>
          <div className="mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
            <div className="mt-6 min-w-0 flex-1 sm:hidden md:block">
              <h1 className="truncate text-2xl font-bold">{projectData.name}</h1>
              <h2 className='truncate text-xs'>{projectData.created_by}</h2>
            </div>            
          </div>
          <div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0 text-black">
            {/* <Link href={`${projectData.slug}/stream/`} className={buttonVariants({ variant: "outline" })}>Stream into Tributary</Link> */}
            <StreamSetup />
          </div>
        </div>
        <div className="mt-6 hidden min-w-0 flex-1 sm:block md:hidden">
          <h1 className="truncate text-2xl font-bold">{projectData.name}</h1>
        </div>
      </div>
    </div>
  )
}
