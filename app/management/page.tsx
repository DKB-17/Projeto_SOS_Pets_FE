"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { getAuthToken } from "@/api/utils/auth"
import { usePosts, useCreatePost, useUpdatePost, useDeletePost } from "@/api/hooks/usePosts"
import { useSuccessStories, useCreateSuccessStory, useDeleteSuccessStory } from "@/api/hooks/useSuccessStories"
import { Trash2, Plus } from "lucide-react"

export default function ManagementPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const token = getAuthToken()
    if (!token) {
      router.push("/login")
    } else {
      setIsAuthenticated(true)
    }
  }, [router])

  if (!mounted || !isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl font-bold text-foreground mb-8">Painel de gerenciamento</h1>

            <Tabs defaultValue="posts" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="posts">Posts</TabsTrigger>
                <TabsTrigger value="stories">Histórias de sucesso</TabsTrigger>
              </TabsList>

              <TabsContent value="posts">
                <PostsManagement />
              </TabsContent>

              <TabsContent value="stories">
                <StoriesManagement />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
    </div>
  )
}

function PostsManagement() {
  const { posts, loading, error } = usePosts()
  const { createPost, loading: createLoading } = useCreatePost()
  const { updatePost, loading: updateLoading } = useUpdatePost()
  const { deletePost, loading: deleteLoading } = useDeletePost()
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formData, setFormData] = useState({ title: "", text: "" })
  const [message, setMessage] = useState("")

  const handleCreate = async () => {
    if (!formData.title || !formData.text) {
      setMessage("Please fill in all fields")
      return
    }
    try {
      await createPost({
        title: formData.title,
        text: formData.text,
        category: { id: 1, name: "General" },
      })
      setFormData({ title: "", text: "" })
      setMessage("Post created successfully")
      setTimeout(() => setMessage(""), 3000)
    } catch (err) {
      setMessage("Failed to create post")
    }
  }

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this post?")) {
      try {
        await deletePost(id)
        setMessage("Post deleted successfully")
        setTimeout(() => setMessage(""), 3000)
      } catch (err) {
        setMessage("Failed to delete post")
      }
    }
  }

  return (
    <div className="space-y-6 mt-6">
      {message && (
        <Alert>
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Criar novo post
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Título</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Post title"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="text">Conteúdo</Label>
            <textarea
              id="text"
              value={formData.text}
              onChange={(e) => setFormData({ ...formData, text: e.target.value })}
              placeholder="Post content"
              className="w-full min-h-32 p-3 border rounded-md"
            />
          </div>
          <Button onClick={handleCreate} disabled={createLoading}>
            {createLoading ? "Creating..." : "Create Post"}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Lista de posts</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-muted-foreground">Carregando...</p>
          ) : error ? (
            <p className="text-red-500">Erro ao carregar posts</p>
          ) : (
            <div className="space-y-3">
              {posts.map((post) => (
                <div key={post.id} className="flex items-center justify-between p-3 border rounded">
                  <div>
                    <h3 className="font-semibold">{post.title}</h3>
                    <p className="text-sm text-muted-foreground">{post.text.substring(0, 50)}...</p>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(post.id || 0)}
                    disabled={deleteLoading}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

function StoriesManagement() {
  const { stories, loading, error } = useSuccessStories()
  const { createStory, loading: createLoading } = useCreateSuccessStory()
  const { deleteStory, loading: deleteLoading } = useDeleteSuccessStory()
  const [formData, setFormData] = useState({ petName: "", ownerName: "", story: "", adoptionDate: "", petType: "" })
  const [message, setMessage] = useState("")

  const handleCreate = async () => {
    if (!formData.petName || !formData.story) {
      setMessage("Please fill in required fields")
      return
    }
    try {
      await createStory({
        petName: formData.petName,
        ownerName: formData.ownerName,
        text: formData.story,
        date: formData.adoptionDate,
        petBreed: formData.petType,
      })
      setFormData({ petName: "", ownerName: "", story: "", adoptionDate: "", petType: "" })
      setMessage("Story created successfully")
      setTimeout(() => setMessage(""), 3000)
    } catch (err) {
      setMessage("Failed to create story")
    }
  }

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this story?")) {
      try {
        await deleteStory(id)
        setMessage("Story deleted successfully")
        setTimeout(() => setMessage(""), 3000)
      } catch (err) {
        setMessage("Failed to delete story")
      }
    }
  }

  return (
    <div className="space-y-6 mt-6">
      {message && (
        <Alert>
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Criar nova história
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="petName">Nome do animal</Label>
              <Input
                id="petName"
                value={formData.petName}
                onChange={(e) => setFormData({ ...formData, petName: e.target.value })}
                placeholder="Pet name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ownerName">Nome da proprietária</Label>
              <Input
                id="ownerName"
                value={formData.ownerName}
                onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                placeholder="Owner name"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="story">História</Label>
            <textarea
              id="story"
              value={formData.story}
              onChange={(e) => setFormData({ ...formData, story: e.target.value })}
              placeholder="Adoption story"
              className="w-full min-h-32 p-3 border rounded-md"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="adoptionDate">Data da adoção</Label>
              <Input
                id="adoptionDate"
                value={formData.adoptionDate}
                onChange={(e) => setFormData({ ...formData, adoptionDate: e.target.value })}
                placeholder="e.g., January 2024"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="petType">Tipo do animal</Label>
              <Input
                id="petType"
                value={formData.petType}
                onChange={(e) => setFormData({ ...formData, petType: e.target.value })}
                placeholder="Dog, Cat, etc."
              />
            </div>
          </div>
          <Button onClick={handleCreate} disabled={createLoading}>
            {createLoading ? "Creating..." : "Create Story"}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Lista de histórias</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-muted-foreground">Carregando...</p>
          ) : error ? (
            <p className="text-red-500">Erro ao carregar histórias</p>
          ) : (
            <div className="space-y-3">
              {stories.map((story) => (
                <div key={story.id} className="flex items-center justify-between p-3 border rounded">
                  <div>
                    <h3 className="font-semibold">{story.petName}</h3>
                    <p className="text-sm text-muted-foreground">Dono: {story.ownerName}</p>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(story.id || 0)}
                    disabled={deleteLoading}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
