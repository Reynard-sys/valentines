"use client";

import { useState, useCallback, useEffect } from "react";
import SakuraFalling from "@/components/SakuraFalling";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import AutoScroll from "embla-carousel-auto-scroll";
import useEmblaCarousel from "embla-carousel-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const memories = [
  {
    image: "/mem1.png",
    title: "6 7 siblings",
    text: "The day where we got closer. If not for this day, siguro we won't start our streak, we wouldn't be sending each other dumb videos, and we wouldn't be talking every day. So in a way, I'm really thankful for ArtApp. Dito rin ako unang nagka-idea about your humor, and I realized how much fun it is to spend time with u HAHAHAHA. Also, u looked so CUTEEE with those pigtails (⸝⸝> ᴗ•⸝⸝)",
    badge: "Funny",
  },
  {
    image: "/mem2.png",
    title: "Jujutsu Kaisen",
    text: "I was so shy na ayain ka directly sa chat, so I turned our convo into my cinema rating sabay sabi na I haven't tried SM Sta. Mesa yet 😝. Also, I was too shy to ask for a pic kahit gusto ko talaga, sayang (╥﹏╥) pero I won't hold back next time 😼",
    badge: "Frauds",
  },
  {
    image: "/mem3.png",
    title: "One Piece Symphony pt.1",
    text: "I just want to say, u totally nailed your Zoro inspired fit!! I kept wanting to say how pretty u were and ask for a picture, but I couldn't find the words. Buti talaga ikaw nag initiate mag pic HAHAHA nawawala angas ko pag dating sa'yo e .·°՞(¯□¯)՞°·.",
    badge: "0.5",
  },
  {
    image: "/mem4.png",
    title: "One Piece Symphony pt.2",
    text: "I LOVE UR NOSE SCRUNCH SO MUCH!!! SUCH A CUTIE <33",
    badge: "Cutest",
  },
  {
    image: "/mem5.png",
    title: "One Piece Symphony pt.3",
    text: "One of my favorite pics of us. We're so cute together here! Haist, I miss my cutie so muchhh (づ ᴗ _ᴗ)づ♡",
    badge: "Zoro vs Sanji",
  },
  {
    image: "/mem6.png",
    title: "One Piece Symphony pt.4",
    text: "End of the symphony. The performance was so good, but your presence in between made the whole experience a lot better. I'm very thankful that I got to experience it with u (˶ᵔ ᵕ ᵔ˶)",
    badge: "To be Continued",
  },
  {
    image: "/mem7.png",
    title: "Life4Cuts",
    text: "My attempt at taking a pic of us HAHHAAHAHAHAHA (👁_ 👁)",
    badge: "Stolen?!?!",
  },
  {
    image: "/mem8.png",
    title: "Our First Photobooth",
    text: "WAHHH I'M SO HAPPY WE DID THIS. NGL DI PA AKO NAKAKABILI NG TICKET, PERO EXCITED NA AKO SA POSSIBILITY NA MAG PPHOTOBOOTH TAYO ₍₍⚞(˶˃ ꒳ ˂˶)⚟⁾⁾",
    badge: "Photobooth",
  },
  {
    image: "/mem9.png",
    title: "Our First Kita After Confessing",
    text: "I legit cannot sleep well since what happened sa chill top. It was a mix of emotions for me na namimiss kita, I hope I said more last time, and basically just craving more of u. Sa sobrang pag yyearn ko sa'yo, binigyan ako ng seller na malapit sa inyo para raw magkita na us HAHAHAHA",
    badge: "Missing you",
  },
  {
    image: "/mem10.png",
    title: "Our First Kita After Confessing PT.2",
    text: "YOU'RE JUST TOO ADORABLE GADDANG IT. AND AS I SAID, I LOVE YOUR NOSE SCRUNCH!!! (˶˃⤙˂˶)",
    badge: "THE CUTEST",
  },
  {
    image: "/mem11.png",
    title: "Ragebaiter",
    text: "Ikaw pala talaga yung ragebaiter satin e 😌",
    badge: "RAWR",
  },
  {
    image: "/mem12.png",
    title: "SHE SAID YES",
    text: "HELLO MY VALENTINE <33 IT FELT SO NICE TO PROPERLY ASK U OUT FOR VALENTINE'S DAY. I'M LOOKING FORWARD TO IT, I MISS U SO MUCH (っ˶ ˘ ᵕ˘)ˆᵕ ˆ˶ς)",
    badge: "MY VALENTINE",
  },
  {
    image: "/mem13.png",
    title: "Our First Date",
    text: "The first time we went out together knowing it was actually a date. Also one of my favorite pic of us! I'm so happy I get to talk, laugh, eat, and spend all that time with u. Also, u looked so beautiful in that pink top with the white layer, + the heart pendant (ෆ˙ᵕ˙ෆ)♡",
    badge: "First Date",
  },
  {
    image: "/mem14.png",
    title: "Polka Day 1",
    text: "I know we both went there with a different purpose in mind, so I try not to mix our kilig moments with our goals, pero dangggg this pic of us is just too good. BAGAY BAGAY \n ( ദ്ദി ˙ᗜ˙ )",
    badge: "Stolen",
  },
  {
    image: "/mem15.png",
    title: "Polka Day 2",
    text: "Our last kita so far. I really appreciate every moment we've had. I can't quite describe it, but it feels like I've met another version of myself. I hope we can continue what we have and create even more memories together. I'm looking forward to our future plans, dates, and ganaps. Thank you for existing and for sharing your life with me. I'm so grateful that I met you, and that I always appreciate you. I miss you so much. See you later, cutie! Happy Valentine's Day (˶ᵔ ᵕ ᵔ˶) ‹𝟹",
    badge: "I <3 U",
  },
];

const IMAGE_WIDTH = 896;
const IMAGE_HEIGHT = 1080;

export default function Memories() {
  const [selectedMemory, setSelectedMemory] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      startIndex: 0,
      align: "start",
    },
    [
      AutoScroll({
        speed: 1,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    ],
  );

  const handleImageClick = useCallback((memory, index) => {
    setSelectedMemory(memory);
    setSelectedIndex(index);
  }, []);

  const handleClose = useCallback(() => {
    setSelectedMemory(null);
    setIsScrolling(true);
  }, []);

  useEffect(() => {
    if (!selectedMemory && emblaApi && selectedIndex !== null && isScrolling) {
      emblaApi.scrollTo(selectedIndex, true);
      setTimeout(() => {
        setIsScrolling(false);
      }, 50);
    }
  }, [selectedMemory, emblaApi, selectedIndex, isScrolling]);

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-linear-to-br from-[#ffeef8] via-[#fff5f7] to-[#f0ffe0] overflow-hidden">
      <SakuraFalling />

      <div className="flex flex-col items-center gap-6 pointer-events-auto z-10 w-full px-4">
        <Image
          src="/memories.png"
          alt="Memories Title"
          width={300}
          height={200}
          className="object-contain"
          priority
        />

        {selectedMemory ? (
          <Card className="relative mx-auto w-full h-full max-w-sm pt-0 animate-in fade-in zoom-in duration-300">
            <div className="absolute inset-0 z-30 aspect-video" />
            <img
              src={selectedMemory.image}
              alt={selectedMemory.title}
              className="relative z-20 aspect-video w-full h-full object-cover"
            />
            <CardHeader>
              <CardAction>
                <Badge variant="secondary">{selectedMemory.badge}</Badge>
              </CardAction>
              <CardTitle>{selectedMemory.title}</CardTitle>
              <CardDescription className="whitespace-pre-line">
                {selectedMemory.text}
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button className="w-full" onClick={handleClose}>
                Back to Memories
              </Button>
            </CardFooter>
          </Card>
        ) : (
          <div className="w-full" style={{ maxWidth: IMAGE_WIDTH }}>
            <div ref={emblaRef} className="overflow-hidden">
              <div className="flex -ml-2 md:-ml-4">
                {memories.map((memory, index) => (
                  <div
                    key={index}
                    className="pl-2 md:pl-4 basis-1/4 lg:basis-1/4 min-w-70 shrink-0"
                  >
                    <div className="p-1">
                      <div
                        className="relative w-full bg-gray-200 rounded-lg overflow-hidden cursor-pointer transition-transform hover:scale-105 hover:shadow-xl"
                        onClick={() => handleImageClick(memory, index)}
                      >
                        <Image
                          src={memory.image}
                          alt={memory.title}
                          width={IMAGE_WIDTH}
                          height={IMAGE_HEIGHT}
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        <div className="mt-4 text-center">
          <p className="text-pink-600 font-medium text-sm sm:text-base animate-pulse">
            Happy Valentine's Day Joyrel! You should click on each memory <br />
            to see a special note from me (˵ •̀ ᴗ - ˵ ) ✧. Don't miss a single
            memory ha hehe &lt;33 <br /> Also please last mong iclick ung mirror
            pic natin sa polkadot day 2 😁
          </p>
        </div>
      </div>
    </main>
  );
}
