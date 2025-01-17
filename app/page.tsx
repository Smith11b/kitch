
import EmailForm from "./email-form";
import styles from "./page.module.css";
import Image from 'next/image';


export default function Homepage() {

    return (
        <>
            <nav className={styles.nav}>
                <Image
                    src="images/kitch-logo-dark-blue.svg"
                    alt="An example image"
                    width={180}
                    height={50}
                />
            </nav>
            <main className={styles.main}>
                <section className={styles.hero}>
                    <h1 className="text-center lg:text-5xl font-bold text-secondary-blue mb-5 text-3xl">Your customers are hungry.
                        <span className={styles.responsiveBreak}> Our software helps you feed them.</span>
                    </h1>
                    <p data-testid="homepage-subheader" className={`${styles.subheader} lg:text-lg text-base`}>Running a meal prep business ain’t easy (unless you have <span className={styles.logoSpan}>kitch</span>). Quick menu creation, easy order fulfillment, and a website live in just minutes. Stop wasting hours taking customer orders and grow your business.</p>
                    <EmailForm />
                    <p className={styles.landerSubtext}>get 1 year of beta pricing!</p>
                </section>
                <section className={styles.landerImages}>
                    <Image
                        src="/images/prepped-steak-one.png"
                        alt="An example image"
                        width={670}
                        height={391}
                    />
                    <Image
                        src="/images/prepped-steak-two.png"
                        alt="An example image"
                        width={670}
                        height={391}
                        className={styles.imageTwo}
                    />
                </section>
            </main>
        </>
    );
}
