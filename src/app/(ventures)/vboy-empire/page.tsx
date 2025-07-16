import { Shirt, Music, Video, Rss } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';

export default function VboyEmpirePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-3xl text-center">
        <Shirt className="mx-auto h-12 w-12 text-primary" />
        <h1 className="mt-4 font-headline text-4xl font-bold tracking-tighter sm:text-5xl">
          VBoy Empire
        </h1>
        <p className="mt-4 text-muted-foreground md:text-xl">
          A multi-faceted entertainment brand focusing on music, merch, and exclusive content.
        </p>
      </div>

       <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
        <FeatureCard
          icon={<Shirt className="h-8 w-8 text-primary" />}
          title="Merch Store"
          description="Exclusive Empire merchandise with a limited drop strategy."
        />
        <FeatureCard
          icon={<Music className="h-8 w-8 text-primary" />}
          title="Music Downloads"
          description="Preview and purchase music tracks with Stripe checkout."
        />
        <FeatureCard
          icon={<Video className="h-8 w-8 text-primary" />}
          title="Exclusive Videos"
          description="Pay-per-view or subscription video library with behind-the-scenes content."
        />
         <FeatureCard
          icon={<Rss className="h-8 w-8 text-primary" />}
          title="Blog/Vlog"
          description="Regularly updated content with user engagement features."
        />
      </div>

       <div className="mt-12 text-center">
        <Button size="lg" asChild>
          <Link href="/vboy-empire/signup">Join the Empire</Link>
        </Button>
      </div>
      
      <div className="mt-20">
        <h2 className="text-center font-headline text-3xl font-bold mb-8">Latest Drops</h2>
        <div className="grid md:grid-cols-3 gap-8">
            <ProductCard image="/_next/image?url=https%3A%2F%2Fstorage.googleapis.com%2Ffirebase-studio-users%2Fuser-lQ3FpucD3f1iGDsWbZq3%2Fimages%2Fclvgd8g0w0002m80p4u7v1tav.png&w=1080&q=75" dataAiHint="album cover" name="What They Hatin' Fo?" price="$9.99" />
            <ProductCard image="/_next/image?url=https%3A%2F%2Fstorage.googleapis.com%2Ffirebase-studio-users%2Fuser-lQ3FpucD3f1iGDsWbZq3%2Fimages%2Fclvgsdcrk0004m80pdqj9d0de.png&w=1080&q=75" dataAiHint="album cover" name="Mack or Die" price="$9.99" />
            <ProductCard image="https://placehold.co/600x600.png" dataAiHint="gold cap" name="Empire Cap" price="$29.99" />
        </div>
      </div>

    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <Card className="text-center">
      <CardHeader>
        <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
          {icon}
        </div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  );
}

function ProductCard({ image, dataAiHint, name, price }: { image: string, dataAiHint: string, name: string, price: string }) {
    return (
        <Card className="overflow-hidden group">
            <CardContent className="p-0">
                <Image src={image} alt={name} width={600} height={600} className="object-cover w-full h-auto aspect-square group-hover:scale-105 transition-transform duration-300" data-ai-hint={dataAiHint} />
            </CardContent>
            <CardHeader>
                <CardTitle>{name}</CardTitle>
                <div className="flex justify-between items-center">
                    <p className="text-lg font-semibold">{price}</p>
                    <Button>Add to Cart</Button>
                </div>
            </CardHeader>
        </Card>
    );
}
