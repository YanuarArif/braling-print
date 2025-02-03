// testimonials-data.ts

import { TestimonialAuthor } from "@/components/ui/testimonial-card"; // Assuming TestimonialAuthor is defined here

export const testimonials: {
  author: TestimonialAuthor;
  text: string;
  href?: string;
}[] = [
  {
    author: {
      name: "Alice Johnson",
      title: "CEO, Tech Innovations Inc.",
      image: "/images/testimonial-avatar-1.jpg",
      handle: "alice_johnson_ceo", // Added handle
      avatar:
        "https://cdn.pixabay.com/photo/2016/11/18/19/07/happy-1836445_1280.jpg", // Added avatar, assuming 'avatarts' was a typo and should be 'avatar'
    },
    text: "Game-changer! Easy to integrate, beautifully displays feedback. Carousel is smooth and engaging. Highly recommend!",
  },
  {
    author: {
      name: "Bob Williams",
      title: "Lead Developer, Software Solutions Co.",
      image: "/images/testimonial-avatar-2.jpg",
      handle: "bob_williams_dev", // Added handle
      avatar:
        "https://cdn.pixabay.com/photo/2016/11/18/19/07/happy-1836445_1280.jpg", // Added avatar, assuming 'avatarts' was a typo and should be 'avatar'
    },
    text: "Fantastic component. Clean code, easy to customize, great performance. Tailwind CSS styling is a breeze. Saved development time!",
  },
  {
    author: {
      name: "Charlie Davis",
      title: "Marketing Manager, Digital Growth Agency",
      image: "/images/testimonial-avatar-3.jpg",
      handle: "charlie_davis_mkt", // Added handle
      avatar:
        "https://cdn.pixabay.com/photo/2016/11/18/19/07/happy-1836445_1280.jpg", // Added avatar, assuming 'avatarts' was a typo and should be 'avatar'
    },
    text: "Immediate results on landing page. Increased engagement and conversions. Visually appealing and effective social proof.",
    href: "https://www.example-agency.com",
  },
  {
    author: {
      name: "Diana Rodriguez",
      title: "Freelance Designer",
      image: "/images/testimonial-avatar-4.jpg",
      handle: "diana_rodriguez_design", // Added handle
      avatar:
        "https://cdn.pixabay.com/photo/2016/11/18/19/07/happy-1836445_1280.jpg", // Added avatar, assuming 'avatarts' was a typo and should be 'avatar'
    },
    text: "Simple to display client feedback professionally. Stylish and responsive across devices. Looks great on my portfolio!",
  },
  {
    author: {
      name: "Ethan Green",
      title: "Founder, Startup Ventures",
      image: "/images/testimonial-avatar-5.jpg",
      handle: "ethan_green_founder", // Added handle
      avatar:
        "https://cdn.pixabay.com/photo/2016/11/18/19/07/happy-1836445_1280.jpg", // Added avatar, assuming 'avatarts' was a typo and should be 'avatar'
    },
    text: "Budget-friendly and high-quality. Easy to implement, premium look, adds credibility. Great asset for any business!",
  },
];
