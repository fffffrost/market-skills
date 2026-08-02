import {
  createSocialImage,
  socialImageAlt,
  socialImageContentType,
  socialImageSize,
} from "@/lib/social-image";

export const alt = socialImageAlt.zh;
export const size = socialImageSize;
export const contentType = socialImageContentType;
export const dynamic = "force-static";

export default function OpenGraphImage() {
  return createSocialImage("zh");
}
