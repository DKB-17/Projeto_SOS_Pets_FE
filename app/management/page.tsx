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
import { useSuccessStories, useCreateSuccessStory, useDeleteSuccessStory, useUpdateSuccessStory } from "@/api/hooks/useSuccessStories"
import { Trash2, Plus } from "lucide-react"
import { useCreateUser, useDeleteUser, useUpdateUser, useUsers } from "@/api/hooks/useUsers"
import { useCreatePartner, useDeletePartner, usePartners, useUpdatePartner } from "@/api/hooks/usePartners"
import { ImageUpload } from "@/components/image-upload"

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
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="posts">Posts</TabsTrigger>
                <TabsTrigger value="stories">Histórias de sucesso</TabsTrigger>
                <TabsTrigger value="users">Usuarios</TabsTrigger>
                <TabsTrigger value="partners">Parceiros</TabsTrigger>
              </TabsList>

              <TabsContent value="posts">
                <PostsManagement />
              </TabsContent>

              <TabsContent value="stories">
                <StoriesManagement />
              </TabsContent>

              
              <TabsContent value="users">
                <UsersManagement />
              </TabsContent>

              <TabsContent value="partners">
                <PartnersManagement />
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
  const [uploadedImages, setUploadedImages] = useState<File[]>([])
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
      }, uploadedImages)
      setFormData({ title: "", text: "" })
      setUploadedImages([])
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
          <ImageUpload onImagesChange={setUploadedImages} maxImages={5} />
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
  const { updateStory, loading: updateLoading } = useUpdateSuccessStory()
  const { deleteStory, loading: deleteLoading } = useDeleteSuccessStory()
  const [formData, setFormData] = useState({ petName: "", ownerName: "", text: "", date: "", petBreed: "" })
  const [uploadedImages, setUploadedImages] = useState<File[]>([])
  const [message, setMessage] = useState("")

  const handleCreate = async () => {
    if (!formData.petName || !formData.text) {
      setMessage("Please fill in required fields")
      return
    }
    try {
      await createStory({
        petName: formData.petName,
        ownerName: formData.ownerName,
        text: formData.text,
        date: formData.date,
        petBreed: formData.petBreed,
      }, uploadedImages )
      setFormData({ petName: "", ownerName: "", text: "", date: "", petBreed: "" })
      setUploadedImages([])
      setMessage("Historia criada com sucesso")
      setTimeout(() => setMessage(""), 3000)
    } catch (err) {
      setMessage("Não conseguiu criar a historia")
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
              <Label htmlFor="petBreed">Raça</Label>
              <Input
                id="petBreed"
                value={formData.petBreed}
                onChange={(e) => setFormData({ ...formData, petBreed: e.target.value })}
                placeholder="Pet breed"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="ownerName">Nome da proprietária</Label>
              <Input
                id="ownerName"
                value={formData.ownerName}
                onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                placeholder="Owner name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Data adoção</Label>
              <Input
                id="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                placeholder="Date"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="text">História</Label>
            <textarea
              id="text"
              value={formData.text}
              onChange={(e) => setFormData({ ...formData, text: e.target.value })}
              placeholder="Adoption story"
              className="w-full min-h-32 p-3 border rounded-md"
            />
          </div>
          <ImageUpload onImagesChange={setUploadedImages} maxImages={5} />
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

function UsersManagement() {
  const { users, loading, error } = useUsers()
  const { createUser, loading: createLoading } = useCreateUser()
  const { updateUser, loading: updateLoading } = useUpdateUser()
  const { deleteUser, loading: deleteLoading } = useDeleteUser()
  const [formData, setFormData] = useState({ name: "", email: "", cpf: "", phone: "", password: "" })
  const [message, setMessage] = useState("")

  const handleCreate = async () => {
    if (!formData.name || !formData.cpf) {
      setMessage("Please fill in required fields")
      return
    }
    try {
      await createUser({
        name: formData.name,
        email: formData.email,
        cpf: formData.cpf,
        phone: formData.phone,
        password: formData.password,
      })
      setFormData({ name: "", email: "", cpf: "", phone: "", password: "" })
      setMessage("User created successfully")
      setTimeout(() => setMessage(""), 3000)
    } catch (err) {
      setMessage("Failed to create user")
    }
  }

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(id)
        setMessage("User deleted successfully")
        setTimeout(() => setMessage(""), 3000)
      } catch (err) {
        setMessage("Failed to delete user")
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
            Create New User
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Full name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cpf">CPF</Label>
              <Input
                id="cpf"
                value={formData.cpf}
                onChange={(e) => setFormData({ ...formData, cpf: e.target.value })}
                placeholder="CPF"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="Phone"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Password"
              />
            </div>
          </div>
          <Button onClick={handleCreate} disabled={createLoading}>
            {createLoading ? "Creating..." : "Create User"}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Users List</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-muted-foreground">Loading...</p>
          ) : error ? (
            <p className="text-red-500">Error loading users</p>
          ) : (
            <div className="space-y-3">
              {users.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-3 border rounded">
                  <div>
                    <h3 className="font-semibold">{user.name}</h3>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(user.id || 0)}
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

function PartnersManagement() {
  const { partners, loading, error } = usePartners()
  const { createPartner, loading: createLoading } = useCreatePartner()
  const { updatePartner, loading: updateLoading } = useUpdatePartner()
  const { deletePartner, loading: deleteLoading } = useDeletePartner()
  const [formData, setFormData] = useState({ name: "", address: "", phone: "", email: "", siteUrl: "" })
  const [message, setMessage] = useState("")

  const handleCreate = async () => {
    if (!formData.name || !formData.address || !formData.phone) {
      setMessage("Please fill in required fields")
      return
    }
    try {
      await createPartner({
        name: formData.name,
        address: formData.address,
        phone: formData.phone,
        email: formData.email,
        siteUrl: formData.siteUrl,
      })
      setFormData({ name: "", address: "", phone: "", email: "", siteUrl: "" })
      setMessage("Partner created successfully")
      setTimeout(() => setMessage(""), 3000)
    } catch (err) {
      setMessage("Failed to create partner")
    }
  }

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this partner?")) {
      try {
        await deletePartner(id)
        setMessage("Partner deleted successfully")
        setTimeout(() => setMessage(""), 3000)
      } catch (err) {
        setMessage("Failed to delete partner")
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
            Create New Partner
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Partner Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Partner name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              placeholder="Address"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="Phone"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Email"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="siteUrl">Website</Label>
            <Input
              id="siteUrl"
              value={formData.siteUrl}
              onChange={(e) => setFormData({ ...formData, siteUrl: e.target.value })}
              placeholder="Website URL"
            />
          </div>
          <Button onClick={handleCreate} disabled={createLoading}>
            {createLoading ? "Creating..." : "Create Partner"}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Partners List</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-muted-foreground">Loading...</p>
          ) : error ? (
            <p className="text-red-500">Error loading partners</p>
          ) : (
            <div className="space-y-3">
              {partners.map((partner) => (
                <div key={partner.id} className="flex items-center justify-between p-3 border rounded">
                  <div>
                    <h3 className="font-semibold">{partner.name}</h3>
                    <p className="text-sm text-muted-foreground">{partner.address}</p>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(partner.id || 0)}
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
