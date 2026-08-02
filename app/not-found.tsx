import Link from "next/link";
import { SiteFrame } from "@/components/site-frame";

export default function NotFound() {
  return (
    <SiteFrame locale="zh">
      <div className="not-found shell">
        <span>ERR://ROUTE_NOT_FOUND</span><strong>404</strong>
        <h1>这个任务还没有对应路径。</h1>
        <p>返回技能库，从你真正要完成的市场工作开始。</p>
        <Link className="primary-link" href="/skills">打开技能库 ↗</Link>
      </div>
    </SiteFrame>
  );
}
