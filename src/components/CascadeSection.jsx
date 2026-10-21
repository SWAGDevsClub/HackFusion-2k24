export default function CascadeSection({
    children,
    className = "",
    overlapScreens = 1,
}) {
    return (
        <section
            className={`relative min-h-screen w-full ${className}`}
            style={{
                marginTop: `-${overlapScreens * 100}vh`,
            }}
        >
            {children}
        </section>
    )
}
