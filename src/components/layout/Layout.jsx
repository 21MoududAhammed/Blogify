import BlogsProvider from "../../provider/BlogsProvider";
import Footer from "../common/Footer";
import Header from "../common/Header";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <Header />
      <BlogsProvider>
        <main>
          <section className="container">
            <Outlet />
          </section>
        </main>
      </BlogsProvider>

      <Footer />
    </>
  );
}
