import React, { useState, useEffect, useCallback, useRef } from 'react';
import './RandomQuote.css';
import twitter_icon from '../assets/twitter.png';
import reload_icon from '../assets/reload.png';

const RandomQuote = () => {
    // Ref to store quotes for random selection
    const quotesRef = useRef([]);

    // State to store the current quote
    const [quote, setQuote] = useState({
        text: 'Not all those who wander are lost',
        author: 'JRR Tolkein',
    });

    // Function to fetch quotes and update the ref
    const loadQuotes = useCallback(async () => {
        const response = await fetch('https://type.fit/api/quotes');
        quotesRef.current = await response.json();
    }, []);

    // Function to generate a random quote
    const random = () => {
        // Select a random quote from the ref
        const select = quotesRef.current[Math.floor(Math.random() * quotesRef.current.length)];
        setQuote(select);
    };

    // Function to share quote on Twitter
    const twitter = () => {
        window.open(`https://twitter.com/intent/tweet?text=${quote.text}-${quote.author.split(',')[0]}`);
    };

    // Load quotes on component mount
    useEffect(() => {
        loadQuotes();
    }, [loadQuotes]);

    return (
        // Use the quote.text as the key to trigger remount for fade-in effect
        <div key={quote.text} className="container fade-in">
            <div className="quote">{quote.text}</div>
            <div>
                <div className="line"></div>
                <div className="bottom">
                    <div className="author">- {quote.author.split(',')[0]}</div>
                    <div className="icons">
                        {/* Button to generate a new random quote */}
                        <img src={reload_icon} onClick={random} alt="Reload Quote" />

                        {/* Button to share the current quote on Twitter */}
                        <img src={twitter_icon} onClick={twitter} alt="Share on Twitter" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RandomQuote;





