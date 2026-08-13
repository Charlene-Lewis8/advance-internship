import Image from 'next/image';



export default function ForYouPage() {
    return (
        <div className="wrapper">
            <div className="search__background">
                <div className="search__wrapper">
                    <div className="search__content">
                        <div className="search">
                            <div className="search__input--wrapper">
                                <input type="text" placeholder="Search for books" className="search__input" />
                                <div className="search__icon" aria-label="Search">
                                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                        <circle cx="11" cy="11" r="5.5" stroke="currentColor" strokeWidth="1.8" />
                                        <path d="M16 16L21 21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="sidebar__toggle--btn">
                            <svg stroke="currentColor" fill="none" stroke-width="0" viewBox="0 0 15 15" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M1.5 3C1.22386 3 1 3.22386 1 3.5C1 3.77614 1.22386 4 1.5 4H13.5C13.7761 4 14 3.77614 14 3.5C14 3.22386 13.7761 3 13.5 3H1.5ZM1 7.5C1 7.22386 1.22386 7 1.5 7H13.5C13.7761 7 14 7.22386 14 7.5C14 7.77614 13.7761 8 13.5 8H1.5C1.22386 8 1 7.77614 1 7.5ZM1 11.5C1 11.2239 1.22386 11 1.5 11H13.5C13.7761 11 14 11.2239 14 11.5C14 11.7761 13.7761 12 13.5 12H1.5C1.22386 12 1 11.7761 1 11.5Z" fill="currentColor"></path></svg>
                        </div>
                    </div>
                </div>
            </div>
            <div className="sidebar__overlay sidebar__overlay--hidden">
                <div className="sidebar__logo">
                    <Image src="/logo.png" alt="Summarist Logo" width={160} height={40} />
                </div>
            </div>
        </div>
    );
}