import logo from "./logo.png";
import videoBanner from "./home-page-banner.mp4";
import people from "./people.png";
import people_org from "./people-org.png";
import credits from "./dollar.png";

const steps = [
  {
    step: "Step 1",
    title: "Select an image",
    description: ` First, choose the image you want to remove background from by clicking on "Start from a Photo." Your image format can be PNG or JPG. We support all image dimensions.`,
  },
  {
    step: "Step 2",
    title: "Let magic remove the background",
    description: `Our tool automatically removes the background from your image. Next, you can choose background color. Our most popular options are white and transparent backgrounds, but you can pick any color you like.`,
  },
  {
    step: "Step 3",
    title: "Downlaod you image",
    description: `After selecting a new background color, download you photo and you're done! You can alos save you picture in the Photoroom App by creating an account`,
  },
];

export const categories = ["People", "Products", "Animals", "Cars", "Graphics"];

const plans = [
  {
    id: "Basic",
    name: "Basic Package",
    price: "499",
    credits: "100 Credits",
    description: "Best for personal use",
    popular: false,
  },
  {
    id: "Premium",
    name: "Premium Package",
    price: "899",
    credits: "250 Credits",
    description: "Best for business use",
    popular: true,
  },
  {
    id: "Ultimate",
    name: "Ultimate Package",
    price: "1499",
    credits: "1000 Credits",
    description: "Best for enterprise use",
    popular: false,
  },
];

const testimonials = [
  {
    id: 1,
    quote: `We are impressed by the AI and think It's the best choice on the market`,
    author: "Ravi Raja",
    handle: "@_ravi_raja_",
  },
  {
    id: 2,
    quote: `remove.bg is leaps and bounds ahead of the compettion. A thousand times better. It simplified the whole process`,
    author: "Rushi Devan",
    handle: "@Rushi_Devan",
  },
  {
    id: 3,
    quote: `We were impressed by its ability to account for pesky, feathery hair without making an image look jagged and amateurish`,
    author: "Ranga Sai",
    handle: "@ranga_sai",
  },
];

const footerConstants = [
  {
    url: "https://github.com/",
    logo: "https://img.icons8.com/fluent/300/github.png",
  },
  {
    url: "http://linkedin.com/in/",
    logo: "https://img.icons8.com/fluent/300/linkedin-2.png",
  },
  {
    url: "https://www.instagram.com/",
    logo: "https://img.icons8.com/fluent/300/instagram-new.png",
  },
];

export const assets = {
  logo,
  videoBanner,
  steps,
  plans,
  testimonials,
  footerConstants,
  people,
  people_org,
  credits,
};
