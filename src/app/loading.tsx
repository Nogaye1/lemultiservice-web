export default function Loading() {
    return (
        <div className="min-h-screen flex items-center justify-center"
            style={{ background: '#05263B' }}>
            <div className="flex flex-col items-center gap-5">
                {/* Spinner ring */}
                <div className="relative w-16 h-16">
                    <div className="absolute inset-0 rounded-full border-2 border-white/10" />
                    <div className="absolute inset-0 rounded-full border-2 border-t-transparent animate-spin"
                        style={{ borderColor: '#449CA1', borderTopColor: 'transparent' }} />
                    <div className="absolute inset-2 rounded-full"
                        style={{ background: 'rgba(68,156,161,0.12)' }} />
                </div>

                {/* Progress bar */}
                <div className="w-40 h-0.5 rounded-full overflow-hidden"
                    style={{ background: 'rgba(255,255,255,0.1)' }}>
                    <div className="h-full rounded-full animate-[marquee_1.6s_ease-in-out_infinite]"
                        style={{ background: 'linear-gradient(to right, transparent, #449CA1, transparent)', width: '60%' }} />
                </div>

                <p className="text-white/30 text-xs font-dm uppercase tracking-widest">
                    LeMultiservice
                </p>
            </div>
        </div>
    )
}
