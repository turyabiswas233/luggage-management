import React from "react";
import logo from "../assets/img/home-two/logo3.svg";
import { Helmet } from "react-helmet-async";
function Privacy() {
  return (
    <div className="w-full m-0 bg-white p-2">
      <Helmet>
        <title>Privacy Policy - Urloker</title>
        <meta name="description" content="Privacy Policy for Urloker" />
        {/* canonical link */}
        <link rel="canonical" href="https://urloker.com/privacy-policy" />
        {/*  Robots meta tag */}
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta
          name="keywords"
          content="Urloker, Privacy Policy, Privacy Notice, Privacy Consent"
        />
      </Helmet>
      <div id="logo">
        <a href="/">
          <img
            className="aspect-square"
            src={logo}
            width={100}
            height={100}
            alt="logo"
          />
        </a>
      </div>
      {/* privacy data */}
      <main className="py-24 px-3">
        <header>
          <h2 className="font-bold text-4xl">Privacy Policy for Urloker</h2>
        </header>

        <div id="pnc" className="py-10 space-y-2">
          <h2 className="font-bold text-3xl">Privacy Notice and Consent</h2>

          <p>
            This privacy notice explains how your information is collected and
            used by Urloker.com. At Urloker.com, we take your privacy seriously
            and request that you read this policy carefully, as it outlines
            important information on:
          </p>

          <ul className="list-disc p-10">
            <li>The personal data we collect from you,</li>
            <li>How we use your data, and</li>
            <li>Who we may share your data with.</li>
          </ul>

          <h3 className="font-bold text-xl">Who We Are</h3>
          <p>
            Urloker.com (&quot;we&quot; or &quot;us&quot;) acts as a "data
            controller" under the General Data Protection Regulation (GDPR)
            2018. This means we are responsible for, and control the processing
            of, your personal data. The person responsible for managing your
            personal information at Urloker.com is reachable at{" "}
            <a href="mailto:support@urloker.com" className="text-blue-600">
              support@urloker.com
            </a>
            .
          </p>
        </div>
        <div id="widwc" className="py-10 space-y-2">
          <h2 className="font-bold text-3xl">
            What Information Do We Collect?
          </h2>
          <h3 className="font-bold text-xl">
            Personal Information Provided by You
          </h3>
          <p>
            We collect the following personal information when you create an
            account or make a booking on our website or through our apps:
          </p>
          <ul className="list-disc p-10">
            <li>Your name,</li>
            <li>Country of origin,</li>
            <li>Email address,</li>
            <li>Phone numbers.</li>
          </ul>
          <p>
            Additionally, we may collect personal data when you contact us,
            provide feedback, complete customer surveys, or participate in any
            competitions. Our website also uses cookies (see the "Use of
            Cookies" section below) and collects IP addresses, which uniquely
            identify your device on the internet.
          </p>
          <p>
            We collect this information to provide you with the best possible
            service. Your contact details are required to send transaction
            confirmations and to inform you of any important updates. Your name
            and address help our service points verify your identity when you
            drop off or collect your belongings.
          </p>
          <p>
            &quot;Personal data&quot; is defined in Article 4(1) of the GDPR as
            any information relating to an identified or identifiable natural
            person.
          </p>
          <h3 className="font-bold text-xl">
            Personal Information About Others
          </h3>
          <p>
            If you provide us with information on behalf of someone else, you
            confirm that the individual has authorized you to:
          </p>
          <ul className="list-disc p-10">
            <li>
              Consent to the processing of their personal data on their behalf,
            </li>
            <li>
              Receive any data protection notices on their behalf, and Consent
              to
            </li>
            <li>the transfer of their personal data abroad if necessary.</li>
          </ul>
          <h3 className="text-xl font-bold">Sensitive Personal Information</h3>
          <p>
            We generally do not request sensitive personal information from you.
            If we ever need such information, it will be requested for a
            specific reason, such as to assist with an account issue due to
            illness. We will explain why we need this information and how it
            will be used. We will only collect sensitive personal information
            with your explicit consent.
          </p>
          <h3 className="text-xl font-bold">Children</h3>
          <p>
            We do not knowingly collect personal data from children under the
            age of 16. If you believe that we may have collected information
            about a child under 16, please contact us at{" "}
            <a className="text-blue-600" href="mailto:support@urloker.com">
              support@urloker.com
            </a>
            . We will ask for proof of your relationship to the child before
            considering any requests to access or delete their data.
          </p>
          <h3 className="text-xl font-bold">Payment Information</h3>
          <p>
            We do not collect or store your payment information. This is handled
            by our third-party payment processor, Stripe. Stripe only retains
            the data necessary to fulfill legal obligations, with any additional
            data stored securely with your consent. Please review Stripe's
            privacy policy for further details.
          </p>
        </div>

        <div id="hdwci" className="py-10 space-y-2">
          <h2 className="text-3xl font-bold">How Do We Collect Information?</h2>
          <p>
            We collect information directly from you via our website and mobile
            applications. We may also monitor and record communications with
            you, such as emails, for quality assurance, training, fraud
            prevention, or legal compliance.
          </p>
          <h3 className="text-xl font-bold">Use of Cookies</h3>
          <p>
            Cookies are small text files placed on your device when you use our
            website. We use cookies to analyze visitor behavior and improve your
            user experience. These cookies do not identify you personally. You
            can set your browser to reject cookies, but some website features
            may not function as a result. For more details, refer to our Cookie
            Policy.
          </p>
        </div>

        <div id="hwwuyi" className="py-10 space-y-2">
          <h2 className="text-3xl font-bold">
            How Will We Use Your Information?
          </h2>
          <p>We collect information for several reasons, including:</p>
          <ul>
            <li>To enter into and fulfill contracts with you,</li>
            <li>To manage your account,</li>
            <li>
              To contact you regarding your service or any necessary changes,
            </li>
            <li>To comply with legal obligations,</li>
            <li>To improve our services and website content.</li>
          </ul>
          <p>
            If we intend to use your information for any other purpose, we will
            notify you and seek your consent if required.
          </p>

          <h3 className="text-xl font-bold">Marketing</h3>
          <p>
            We may contact you with information about our products, services, or
            special offers that might interest you. You can opt out of marketing
            communications at any time by following the instructions in the
            "Your Rights" section below.
          </p>
        </div>

        <div id="wmwsyiw" className="py-10 space-y-2">
          <h2 className="text-3xl font-bold">
            Who Might We Share Your Information With?
          </h2>
          <p>We may share your personal data with:</p>
          <ul className="list-disc p-10">
            <li>Service provides under contract with us,</li>
            <li>Our payment processor, Stripe,</li>
            <li>
              Law enforcement or government agencies when required by law,
            </li>
            <li>Business partners for marketing purposes.</li>
          </ul>
          <h3 className="text-xl font-bold">Keeping Your Data Secure</h3>
          <p>
            We take the security of your data seriously, using both technical
            and organizational measures to protect it. However, please be aware
            that the internet is not entirely secure, and we cannot guarantee
            the security of data transmitted online.
          </p>
          <h3 className="text-xl font-bold">Your Rights</h3>
          <p>
            You have several rights regarding your personal data, including the
            right to access, correct, or delete your information. You may also
            ask us to stop contacting you for marketing purposes. For more
            details on how to exercise these rights, please contact us at
            <a href="mailto:support@urloker.com" className="text-blue-600">
              support@urloker.com
            </a>
            .
          </p>
          <h3 className="text-xl font-bold">How to Contact Us</h3>
          <p>
            If you have any questions about this privacy policy or the
            information we hold about you, please contact us at
            <a href="mailto:support@urloker.com" className="text-blue-600">
              support@urloker.com
            </a>
            .
          </p>
          <h3 className="text-xl font-bold">Changes to This Policy</h3>
          <p>
            We may update this privacy policy from time to time. Please review
            this policy periodically to stay informed of any changes.
          </p>
        </div>
      </main>
    </div>
  );
}

export default Privacy;
