import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { cn } from "@/lib/utils"

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link"
import Image from "next/image";

export const dynamic = 'force-dynamic'

export default async function Home() {
  const supabase = createServerComponentClient({ cookies });
  const { data: projects } = await supabase.from('Projects').select();
  console.log(projects)

  return (
    <div className="">
      <h2 className={`mb-3 text-2xl font-semibold`}>
            Explore All Projects
      </h2>
      <ul className="grid gap-4 grid-cols-3 grid-rows-3">
        {projects?.map((project) => (
          <li key={project.id}>
            <Link href={`/project/${project.slug}`}>
                <Card>
                  <CardHeader>
                  <Image 
                   src={`https://picsum.photos/seed/${project.name}/2500`} 
                   width={1000} 
                   height={300}
                   alt={project.name}
                   className={cn(
                    "h-auto w-auto object-cover pb-2 transition-all hover:scale-105",
                    "aspect-video"
                  )}/>
                    <CardTitle>{project.name}</CardTitle>
                    <CardDescription>{project.created_by}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>{project.about}</p>
                  </CardContent>
                </Card>
            </Link>
          </li>
        ))}
      </ul>  
    </div>
  )
}
