import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="h-[22vh] p-[1.5rem] bg-white">
      <div className="lg:max-w-[1000px] lg:my-0 lg:mx-auto flex flex-wrap gap-y-[3px] gap-x-[10px] text-[13px] text-[#65676b] max-w-[350px] my-0 mx-auto child:flex child:items-center child-hover:underline">
        <Link to="/">English(UK)</Link>
        <Link to="/">Français(FR)</Link>
        <Link to="/">العربية</Link>
        <Link to="/">ⵜⴰⵎⴰⵣⵉⵖⵜ</Link>
        <Link to="/">Español (España)</Link>
        <Link to="/">italiano</Link>
        <Link to="/">Deutsch</Link>
        <Link to="/">Português (Brasil)</Link>
        <Link to="/">हिन्दी</Link>
        <Link to="/">中文(简体)</Link>
        <Link to="/">日本語</Link>
        <Link
          to="/"
          className="bg-[#f0f2f5] h-[19px] w-[30px] flex items-center justify-center bg-[1px] border-[#e4e6eb]"
        >
          <i className="/plus_icon"></i>
        </Link>
      </div>
      <div className="w-full h-[1px] bg-[#e4e6eb] my-[10px] mx-auto max-w-[900px]"></div>
      <div className="lg:max-w-[1000px] lg:my-0 lg:mx-auto  flex flex-wrap gap-y-[3px] gap-x-[10px] text-[13px] text-[#65676b] max-w-[350px] my-0 mx-auto child:flex child:items-center child-hover:underline">
        <Link to="/">Sign Up</Link>
        <Link to="/">Log in</Link>
        <Link to="/">Messenger</Link>
        <Link to="/">Facebook Lite</Link>
        <Link to="/">Watch</Link>
        <Link to="/">Places</Link>
        <Link to="/">Games</Link>
        <Link to="/">Marketplace</Link>
        <Link to="/">Facebook Pay</Link>
        <Link to="/">Oculus</Link>
        <Link to="/">Portal</Link>
        <Link to="/">Instagram</Link>
        <Link to="/">Bulletin</Link>
        <Link to="/">Local</Link>
        <Link to="/">Fundraisers</Link>
        <Link to="/">Services</Link>
        <Link to="/">Voting Information Centre</Link>
        <Link to="/">Groups</Link>
        <Link to="/">About</Link>
        <Link to="/">Create ad</Link>
        <Link to="/">Create Page</Link>
        <Link to="/">Developers</Link>
        <Link to="/">Careers</Link>
        <Link to="/">Privacy</Link>
        <Link to="/">Cookies</Link>
        <Link to="/">
          AdChoices
          <i className="adChoices_icon"></i>
        </Link>
        <Link to="/">Terms</Link>
        <Link to="/">Help</Link>
      </div>
      <div className="lg:max-w-[1000px] lg:my-0 lg:mx-auto  flex flex-wrap gap-y-[3px] gap-x-[10px] text-[13px] text-[#65676b] max-w-[350px] my-0 mx-auto child:flex child:items-center child-hover:underline">
        <Link to="/" style={{ fontSize: "12px", marginTop: "10px" }}>
          Meta © 2023
        </Link>
      </div>
    </footer>
  );
}
