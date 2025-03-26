function infoHTML() {
  return `
      <section id="impressum">
            <h2>Impressum</h2>
            <p><strong>Provider/Responsible for Content:</strong></p>
            <p>Game: El Pollo Loco</p>
            <p>Developer: Adrian Kleinschmidt</p>
            <p>Address: 79114 Freiburg, Germany</p>
            <p>Email: <a href="mailto:kleinchmida@gmail.com">kleinchmida@gmail.com</a></p>

            <h3>Concept & Implementation:</h3>
            <p>The game "El Pollo Loco" is a project idea of the <a href="https://developerakademie.com" target="_blank">Developer Akademie</a> which has been implemented by Adrian Kleinschmidt.</p>
        </section>

        <section id="privacy-policy">
            <h2>Privacy Policy</h2>
            <p>This Privacy Policy describes how we collect, use, and protect your personal data when you visit our website or interact with the game "El Pollo Loco."</p>

            <h3>1. Personal Data Collection</h3>
            <p>We may collect personal information such as your IP address, browser type, and device information when you visit our website. We do not collect any sensitive data without your explicit consent.</p>

            <h3>2. Use of Data</h3>
            <p>The collected data is used for improving the website experience, providing game functionality, and analytics purposes. We do not share your personal data with third parties unless required by law or necessary for the performance of the game.</p>

            <h3>3. Cookies</h3>
            <p>Our website uses cookies to improve user experience and analyze website traffic. By using this website, you consent to our use of cookies.</p>

            <h3>4. Third-Party Services</h3>
            <p>We use third-party services that may collect data for their own purposes:</p>
            <ul>
                <li><a href="https://pixabay.com" target="_blank">pixabay.com</a> – For sound effects and icons</li>
                <li><a href="https://flaticon.com" target="_blank">flaticon.com</a> – For icons</li>
                <li><a href="https://fontmeme.com" target="_blank">fontmeme.com</a> – For font services</li>
            </ul>

            <h3>5. Security</h3>
            <p>We take the protection of your data seriously and implement appropriate security measures to prevent unauthorized access, alteration, or destruction of your personal data.</p>

            <h3>6. Your Rights</h3>
            <p>You have the right to request information about the personal data we hold, to correct inaccuracies, and to request the deletion of your data, subject to applicable legal requirements.</p>

            <h3>7. Contact</h3>
            <p>For any privacy-related questions or requests, please contact us at <a href="mailto:kleinchmida@gmail.com">kleinchmida@gmail.com</a>.</p>
        </section>

        <section id="legal-notice">
            <h2>Legal Notice</h2>
            <p>By using this website and the game "El Pollo Loco," you agree to the terms outlined in this legal notice. The game and its content are protected by copyright law, and unauthorized use or distribution is prohibited.</p>
            <br>
            <p><strong>Programming:</strong> Adrian Kleinschmidt, 79114 Freiburg</p>
            <p><strong>Design:</strong> Developer Akademie, <a href="https://developerakademie.com" target="_blank">developerakademie.com</a></p>
            <p><strong>Fonts:</strong> Font resources from <a href="https://fontmeme.com" target="_blank">fontmeme.com</a></p>
            <p><strong>Sounds & Icons:</strong> Free resources from <br> <a href="https://pixabay.com" target="_blank">pixabay.com</a> and <a href="https://flaticon.com" target="_blank">flaticon.com</a></p>
            <br>
            <p>All rights reserved.</p>
        </section>
  `;
}

function controlsHTML() {
  return `
      <h2>Controls</h2>
      <div class="legend">
        <p>Pepe walking left - <button class="legend-button">&#8592;</button>
        <p>Pepe walking right - <button class="legend-button">&#8594;</button></p>
        <p>Pepe jumping high - <button class="legend-button">SPACE</button></p>
        <p>Pepe throwing bottle - <button class="legend-button">D</button></p>
      </div>
    `;
}
