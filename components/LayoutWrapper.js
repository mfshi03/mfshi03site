import { useRouter } from 'next/router'
import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Link from './Link'
import Frames from '@/data/frames.json'
import SectionContainer from './SectionContainer'
import Footer from './Footer'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

const LayoutWrapper = ({ children }) => {
  const { theme, resolvedTheme } = useTheme()
  const [index, setIndex] = useState(0)
  const currentTheme = theme || resolvedTheme
  const router = useRouter()

  useEffect(() => {
    const timer = setInterval(() => setIndex((i) => (i + 1) % Frames.length), 50)
  }, [])

  return (
    <SectionContainer>
      <div className="flex h-screen flex-col justify-between">
        <header className="flex items-center justify-between py-10">
          <div>
            <Link href="/" aria-label={siteMetadata.headerTitle}>
              <div className="flex items-center justify-between">
                <div
                  className="mr-3"
                  style={{
                    color: 'white',
                    textAlign: 'center',
                    fontSize: 5,
                    fontFamily: 'monospace',
                  }}
                >
                  <div
                    dangerouslySetInnerHTML={{ __html: Frames[index] }}
                    style={{ color: 'orange' }}
                  />
                </div>
                {typeof siteMetadata.title === 'string' ? (
                  <div className="hidden h-6 text-lg font-semibold sm:block">
                    {siteMetadata.title}
                  </div>
                ) : (
                  siteMetadata.title
                )}
              </div>
            </Link>
          </div>
          <div className="flex items-center text-base leading-5">
            <div className="hidden sm:block">
              {headerNavLinks.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className={`p-1 text-lg font-medium transition duration-300 ease-in-out sm:p-4 ${
                    router.pathname === link.href
                      ? 'text-primary-500 dark:text-primary-400'
                      : 'text-gray-900 hover:text-primary-600 dark:text-gray-100 dark:hover:text-primary-400'
                  }`}
                >
                  {link.title}
                </Link>
              ))}
            </div>
            <ThemeSwitch />
            <MobileNav />
          </div>
        </header>
        <main className="mb-auto">{children}</main>
        <Footer />
      </div>
    </SectionContainer>
  )
}

export default LayoutWrapper
