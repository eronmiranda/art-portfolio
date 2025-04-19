import { Container } from './Container';

const Footer = () => {
  return (
    <footer className="mt-auto bg-white">
      <Container.Outer>
        <div className="border-t border-zinc-100 pt-6 pb-10">
          <Container.Inner>
            <div className="flex flex-col items-center justify-end sm:flex-row">
              <p className="text-sm text-zinc-500">
                © {new Date().getFullYear()} Marave Bautista. All rights
                reserved.
              </p>
            </div>
          </Container.Inner>
        </div>
      </Container.Outer>
    </footer>
  );
};

export default Footer;
