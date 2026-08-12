export default function ForYouPage() {
    return (
        <div className="wrapper">
            <div className="search__background">
                <div className="search__wrapper">
                    <div className="search__content">
                        <div className="search">
                            <div className="search__input--wrapper">
                                <input type="text" placeholder="Search for books" value="" className="search__input" />
                                <div className="search__icon" aria-label="Search">
                                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                        <circle cx="11" cy="11" r="5.5" stroke="currentColor" strokeWidth="1.8" />
                                        <path d="M16 16L21 21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="sidebar__toggle--btn" />
                    </div>
                </div>
            </div>
        </div>
    );
}