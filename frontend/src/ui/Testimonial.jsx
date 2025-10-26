import { cn } from "@/lib/utils"
import { Marquee } from "../components/ui/marquee.jsx"

const reviews = [
  {
    name: "Elon Musk",
    username: "@elonmusk",
    body: "This tool captures the essence of strategic thinking remarkably well. Very insightful.",
    img: "https://media.gettyimages.com/id/872508684/photo/el-segundo-los-angeles-ca-elon-musk-multi-millionaire-rocket-scientist-tesla-and-space-x.jpg?s=612x612&w=0&k=20&c=8SFlk_yX1FGfjd7zjaAl6uOu8F_yzJsXJ0lZscUzx8o=",
  },
  {
    name: "Satya Nadella",
    username: "@satyanadella",
    body: "Impressive. This platform reflects clarity in thought and execution.",
    img: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRjJD7CObspZXWRjEv4Kdte6WnnMvRWTveWs5QRogVbSdijQfpTGH0kZj10fwym3jekm_ayPfLrm2zHo4y_xMgcpeRtYfW8KCYbx7eq2Taa",
  },
  {
    name: "Naval Ravikant",
    username: "@naval",
    body: "A brilliant way to distill wisdom into actionable insights. I love it.",
    img: "https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcRmEmGIM1hA5JD8_acLpKRSIP_zCDL_Hvw4eDHPRx56z8YbbOpbK1rkitTBW-ieTlsLLsYJLFADrJPnMp0GE5PStcrjNUrdc0O2ePXIUgTvT6-lmzmqXigA-iRp2OPCWk2fN9atofd0SDA",
  },
 ,
,
  {
    name: "Sundar Pichai",
    username: "@sundarpichai",
    body: "Very useful and thoughtfully designed. It’s like conversing with a knowledgeable guide.",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlnCyMl_7P4KMYUNxJJMNSPMLRCN7acXVJ00zOVH5ZkmtmW43X1fI1DZo&s",
  },
    {
    name: "Mark Zuckerberg",
    username: "@zuck",
    body: "A fascinating tool. It really demonstrates the potential of AI in understanding complex ideas.",
    img: "https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcSK6FF_nhJh41X5GjmnygZ-Y0Z3J_v8RQNmIoIT-poXYCk3h2Qv-ci-fHtfowcxW10ogLYsfXFT_xVSbEjoriPuttOOzX8WwgGOQcjmAEM17mWctxxxdFwc0sMCaoaZplQSIquDBlx3YTs",
  }
];


const firstRow = reviews.slice(0, reviews.length / 2)
const secondRow = reviews.slice(reviews.length / 2)

const ReviewCard = ({ img, name, username, body }) => {
  return (
    <figure
      className={cn(
        "relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  )
}

export function MarqueeDemo() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
<div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-black to-transparent"></div>
<div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-black to-transparent"></div>

    </div>
  )
}
