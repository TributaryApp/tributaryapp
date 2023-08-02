"use client"

import Link from "next/link"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
// import { cookies } from "next/headers";
import { useRouter } from 'next/navigation'


import { isAddress } from 'viem'
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from "react-hook-form"
// import ProjectRegistrationForm from "@/components/ui/project-registration-form"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { slugify } from "@/lib/utils";

export const dynamic = 'force-dynamic'

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const formSchema = z.object({
  projectName: z.string()
  .min(2, {
    message: "Username must be at least 2 characters.",
  })
  .refine((name)=> name.toLowerCase() !== 'new' ,{
    message: 'Project cannot be called \'new\'',
  }),
  about: z
    .string()
    .min(10, {
      message: "The Project Description must be at least 10 characters.",
    })
    .max(500, {
      message: "Description must not be longer than 500 characters.",
    }),
  address: z
    .string()
    .refine((addr)=> isAddress(addr),{
      message: 'Please provide a properly formatted address'
    })
    // .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    // .refine(
    //   (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
    //   "Only .jpg, .jpeg, .png and .webp formats are supported."
    // )
})
const supabase = createClientComponentClient()

async function createProject(projectData:any) {
  await supabase
    .from('Projects')
    .insert([{
      created_by: projectData.address,
      about: projectData.about,
      name: projectData.projectName,
      slug: slugify(projectData.projectName)
    }])
}

function ProjectForm() {
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectName: "",
      about: "",
      address: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await createProject(values).then(()=> router.push('/'))
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 text-black">
        <FormField
          control={form.control}
          name="projectName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Username</FormLabel>
              <FormControl>
                <Input className=" bg-transparent text-white" {...field} />
              </FormControl>
              <FormDescription className="text-white">
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="about"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">About</FormLabel>
              <FormControl>
              <Textarea
                  className="resize-none text-white"
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-white">
                Write a few sentences about the project.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Project Address</FormLabel>
              <FormControl>
                <Input placeholder="0xprojectaddress" className="bg-transparent text-white" {...field} />
              </FormControl>
              <FormDescription className="text-white">
                This is the address that contributions will be streamed into.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <FormField
          control={form.control}
          name="picture"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Picture</FormLabel>
              <FormControl>
              <Input type="file" {...field} />
              </FormControl>
              <FormDescription>
                Write a few sentences about the project.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        /> */}

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
  
export default function CreateProject() {
    return (
      <div className="">
        <h2 className={`mb-3 text-2xl font-semibold`}>
              Create new project
        </h2>
        <ProjectForm />
        
        {/* <ProjectRegistrationForm />       */}
      </div>
    )
  }