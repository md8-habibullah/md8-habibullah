import HackerText from "./HackerText";

export default function Hero() {
  return (
    <section className="section-spacing min-h-[calc(100vh-80px)] flex items-center justify-center">
      <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center max-w-6xl w-full">
        {/* Left: Profile Image with glow */}
        <div className="flex justify-center md:justify-end animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-3xl animate-pulse-slow  " />
            <img
              src="https://avatars.githubusercontent.com/u/149287500?v=4&s=300"
              alt="MD. HABIBULLAH SHARIF - Full-Stack Developer & Security Enthusiast"
              className="profile-pic animate-float-up"
              width={224}
              height={224}
            />
          </div>
        </div>

        {/* Right: Content */}
        <div className="space-y-8 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <div className="space-y-4">
            <div className="accent-line" />
            <h1 className="section-title">
              MD. HABIBULLAH
              <br />
              <span className="text-primary">SHARIF</span>
            </h1>
            {/* <p className="text-xl sm:text-2xl font-semibold text-muted-foreground">
              Full-Stack Developer & Security Enthusiast
            </p> */}
            <HackerText text="Full-Stack Developer & Security Enthusiast"
              className="text-xl sm:text-2xl font-semibold text-muted-foreground">
            </HackerText>
          </div>

          <p className="section-subtitle text-base sm:text-lg">
            Building scalable, secure web applications with modern technologies. Full-stack development expertise
            combined with DevOps automation and security-first mindset. Computer Science student from Northern
            University Bangladesh.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <a href="#projects" className="fire-button group">
              <span className="relative z-10">View My Work</span>
            </a>
            <a
              href="https://github.com/md8-habibullah"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3 rounded-lg font-semibold border border-primary/50 text-primary hover:bg-primary/10 hover:border-primary transition-all duration-300"
            >
              GitHub Profile
            </a>
          </div>

          {/* Social Links */}
          {/* Social Links */}
          <div className="flex flex-wrap gap-4 pt-8"> {/* Use flex-wrap and a smaller gap */}

            {/* Base classes for the link "pill" */}
            {/* We will use @apply in CSS for this, but here is the concept: */}
            {/* "group flex items-center p-2 rounded-full bg-neutral-800 text-muted-foreground hover:bg-primary hover:text-white transition-all duration-300 ease-in-out overflow-hidden" */}

            {/* GitHub */}
            <a
              href="https://github.com/md8-habibullah"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="social-link-pill group"
            >
              <svg className="w-6 h-6 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57C20.565 21.795 24 17.31 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
              <span className="social-link-text">
                GitHub
              </span>
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com/in/md-habibullahs"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="social-link-pill group"
            >
              <svg className="w-6 h-6 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.722-2.004 1.418-.103.25-.129.599-.129.948v5.439h-3.554s.05-8.81 0-9.728h3.554v1.375c.43-.664 1.199-1.608 2.925-1.608 2.136 0 3.735 1.395 3.735 4.393l-.001 5.568zM5.337 8.855c-1.144 0-1.915-.762-1.915-1.715 0-.955.77-1.715 1.968-1.715 1.199 0 1.915.76 1.94 1.715 0 .953-.741 1.715-1.993 1.715zm1.582 11.597H3.635V9.724h3.284v10.728zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
              </svg>
              <span className="social-link-text">
                LinkedIn
              </span>
            </a>

            {/* Facebook */}
            <a
              href="https://www.facebook.com/md8.habibullah"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="social-link-pill group"
            >
              <svg className="w-6 h-6 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.675 0h-21.35C.595 0 0 .595 0 1.325v21.351C0 23.405.595 24 1.325 24h11.483v-9.294H9.692v-3.622h3.116V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.464.099 2.795.143v3.24l-1.918.001c-1.504 0-1.796.715-1.796 1.763v2.312h3.587l-.467 3.622h-3.12V24h6.116C23.405 24 24 23.405 24 22.676V1.325C24 .595 23.405 0 22.675 0z" />
              </svg>
              <span className="social-link-text">
                Facebook
              </span>
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/8801329876070"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="social-link-pill group"
            >
              <svg className="w-6 h-6 flex-shrink-0" fill="currentColor" viewBox="0 0 32 32">
                <path d="M16 0C7.163 0 0 6.85 0 15.29c0 2.7.75 5.26 2.04 7.48L0 32l9.46-2.97A15.9 15.9 0 0 0 16 30.58c8.837 0 16-6.85 16-15.29C32 6.85 24.837 0 16 0zm0 28.76c-2.58 0-5.02-.68-7.16-1.97l-.51-.3-5.6 1.76 1.82-5.38-.33-.54a12.15 12.15 0 0 1-1.87-6.34c0-6.66 5.7-12.09 12.7-12.09 3.39 0 6.58 1.28 8.97 3.61a11.78 11.78 0 0 1 3.73 8.48c0 6.67-5.7 12.09-12.7 12.09zm6.96-9.02c-.38-.19-2.25-1.12-2.6-1.25-.35-.13-.6-.19-.85.19-.25.38-.98 1.25-1.2 1.51-.22.25-.45.28-.83.09-.38-.19-1.61-.59-3.07-1.88-1.14-1-1.91-2.23-2.14-2.61-.22-.38-.02-.58.17-.76.17-.17.38-.45.57-.67.19-.22.25-.38.38-.63.13-.25.06-.47-.03-.67-.09-.19-.85-2.05-1.16-2.81-.3-.72-.6-.62-.85-.63-.22-.01-.47-.01-.73-.01s-.67.09-1.02.47c-.35.38-1.34 1.31-1.34 3.2s1.38 3.71 1.58 3.97c.19.25 2.72 4.37 6.6 6.12.92.4 1.64.63 2.2.81.92.29 1.76.25 2.42.15.74-.11 2.25-.92 2.57-1.81.32-.89.32-1.65.22-1.81-.09-.17-.35-.28-.73-.47z" />
              </svg>
              <span className="social-link-text">
                WhatsApp
              </span>
            </a>

            {/* Email */}
            <a
              href="mailto:md8.habibullah@gmail.com"
              aria-label="Email"
              className="social-link-pill group"
            >
              <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span className="social-link-text">
                Email
              </span>
            </a>

          </div>
        </div>
      </div>
    </section>
  )
}
