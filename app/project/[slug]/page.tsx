
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import ProjectPageHeader from "@/components/ui/project-page-header";
import ProjectSummary from "@/components/ui/project-summary-cards";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

async function getProjectData(slug: string) {
  const supabase = createServerComponentClient({ cookies });
  const { data: project , error } = await supabase
  .from('Projects')
  .select('*')
  .eq('slug', slug)

  return project ?? null
}

export default async function ProjectPage({ params: {slug} }: { params: { slug: string } }) {
    const project:any = await getProjectData(slug)

    if (!project) return <p>Project Not Found</p>

    return(
    <div>
        <ProjectPageHeader project={project} />
        <ProjectSummary project={project} />
        <Tabs defaultValue="about" className="w-auto mt-10 px-10">
            <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="updates">Updates</TabsTrigger>
                <TabsTrigger value="streams">Streams</TabsTrigger>
            </TabsList>
            <TabsContent value="about">
                <p>{project.about}</p>
            </TabsContent>
            <TabsContent value="updates">
                <p>Updates</p>
            </TabsContent>
            <TabsContent value="streams">
                <p>Streams</p>
                <p>Current Streams:</p>
            </TabsContent>
        </Tabs>
    </div>
    )
}