import ImageCarousel from "./image-carousel"

export function PatrocinadoresSection() {
    return (
        <section className="py-10 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <ImageCarousel
              images={[
                '/carrocel1.jpg?height=500&width=800',
                '/carrocel2.jpg?height=500&width=800',
                '/carrocel3.jpg?height=500&width=800',
                '/carrocel4.jpg?height=500&width=800',
              ]}
              height={500}
              autoplay={true}
              interval={10000}
              showControls={true}
            />
          </div>
        </div>
      </section>
    )

}