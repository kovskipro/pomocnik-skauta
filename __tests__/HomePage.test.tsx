import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import HomePageClient from '../app/home-page-client'

const mockedFunctions = [
  {
    id: 'przewodnik',
    name: 'Przewodnik',
    description: 'Oprowadza drużynę po okolicy',
    icon: 'compass',
    color_background: 'bg-blue-500',
    color_text: 'text-blue-300',
    color_border: null,
    skills: [
      {
        category: 'Podstawowe umiejętności',
        items: ['Orientacja w terenie', 'Czytanie mapy']
      }
    ]
  }
]

// Mock komponentów Next.js
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt={props.alt} />
  },
}))

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}))

// Mock ikon z lucide-react
jest.mock('lucide-react', () => ({
  ArrowRight: () => <span>ArrowRight</span>,
  Compass: () => <span>Compass</span>,
}))

// Mock navbar i footer
jest.mock('../components/navbar', () => {
  return function MockNavbar() {
    return <nav data-testid="navbar">Navbar</nav>
  }
})

jest.mock('../components/footer', () => {
  return function MockFooter() {
    return <footer data-testid="footer">Footer</footer>
  }
})

describe('HomePage', () => {
  test('renderuje treść od razu, gdy funkcje są przekazane z serwera', () => {
    render(<HomePageClient initialFunctions={mockedFunctions} />)

    expect(screen.getByText('Pomocnik Skauta')).toBeInTheDocument()
    expect(screen.getAllByText('Przewodnik').length).toBeGreaterThan(0)
  })

  test('ładuje i wyświetla funkcje po załadowaniu', async () => {
    render(<HomePageClient initialFunctions={mockedFunctions} />)
    
    // Czeka aż zniknie ekran ładowania i pojawi się zawartość
    await waitFor(() => {
      const przewodnikElements = screen.getAllByText('Przewodnik')
      expect(przewodnikElements.length).toBeGreaterThan(0)
    }, { timeout: 3000 })

    expect(screen.getByText('Oprowadza drużynę po okolicy')).toBeInTheDocument()
    expect(screen.getByText('2 umiejętności')).toBeInTheDocument()
  })

  test('renderuje navbar i footer po załadowaniu', async () => {
    render(<HomePageClient initialFunctions={mockedFunctions} />)

    await waitFor(() => {
      expect(screen.getByTestId('footer')).toBeInTheDocument()
    })

    expect(screen.getByTestId('navbar')).toBeInTheDocument()
  })

  test('nie pokazuje ekranu ładowania, gdy dane są dostępne od razu', () => {
    render(<HomePageClient initialFunctions={mockedFunctions} />)

    expect(screen.queryByText('Ładowanie funkcji...')).not.toBeInTheDocument()
  })
})