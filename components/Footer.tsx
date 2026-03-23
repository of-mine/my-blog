// 服务端组件，静态内容不需要交互

export default function Footer() {
  return (
    <footer className="border-t border-amber-100 py-8 mt-16 text-center text-sm text-stone-400">

      <p>© {new Date().getFullYear()} 笔耕不辍 </p>

    </footer>
  );
}