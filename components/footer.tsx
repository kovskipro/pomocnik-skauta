"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { getAllFunctions, type FunctionRecord } from "@/lib/functions"
import { motion, useReducedMotion } from "framer-motion"

interface FooterProps {
    functions?: FunctionRecord[]
}

export default function Footer({ functions: providedFunctions }: FooterProps) {
    const [fetchedFunctions, setFetchedFunctions] = useState<FunctionRecord[]>([])
    const functions = providedFunctions ?? fetchedFunctions
    const currentYear = new Date().getFullYear()
    const shouldReduceMotion = useReducedMotion()

    useEffect(() => {
        if (providedFunctions) {
            return
        }

        async function loadFunctions() {
            try {
                const data = await getAllFunctions()
                setFetchedFunctions(data)
            } catch (error) {
                console.error('Error loading functions in footer:', error)
            }
        }
        loadFunctions()
    }, [providedFunctions])

    const footerVariants = {
        hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
        show: { opacity: 1, y: 0 },
    }

    return (
        <motion.footer
            className="bg-black py-12 mt-16"
            variants={footerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            <div className="max-w-6xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)_minmax(0,1fr)] gap-10">
                    {/* Logo i opis */}
                    <div className="mb-6 md:mb-0">
                        <div className="flex items-center gap-3 mb-4">
                            <Image src="/croix-agse.png" alt="Logo Skautów Europy" width={32} height={32} className="h-8 w-8 select-none" draggable={false} />
                            <span className="text-lg font-semibold text-white">Pomocnik Skauta</span>
                        </div>
                        <p className="text-neutral-500 text-sm max-w-sm">
                            Kompletny przewodnik po umiejętnościach harcerskich. Poznaj wymagania każdej funkcji i rozwijaj się systematycznie.
                        </p>
                    </div>

                    {/* Funkcje */}
                    <div>
                        <h3 className="text-xs uppercase tracking-wider text-neutral-500 mb-4">Funkcje</h3>
                        <div className="space-y-2">
                            {functions.length > 0 ? (
                                functions.map((func) => (
                                    <Link
                                        key={func.id}
                                        href={`/${func.id}`}
                                        className="block text-sm text-neutral-400 hover:text-white transition-colors"
                                    >
                                        {func.name}
                                    </Link>
                                ))
                            ) : (
                                <p className="text-sm text-neutral-500">
                                    Brak funkcji do wyświetlenia.
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Informacje */}
                    <div>
                        <h3 className="text-xs uppercase tracking-wider text-neutral-500 mb-4">Informacje</h3>
                        <div className="space-y-2">
                            <Link href="/" className="block text-sm text-neutral-400 hover:text-white transition-colors">
                                Strona główna
                            </Link>
                            <Link href="/wkrotce" className="block text-sm text-neutral-400 hover:text-white transition-colors">
                                Dla zastępowych
                            </Link>
                            <Link href="/wkrotce" className="block text-sm text-neutral-400 hover:text-white transition-colors">
                                Panel
                            </Link>
                            <a href="https://gabryssv.tech" target="_blank" rel="noopener noreferrer" className="block text-sm text-neutral-400 hover:text-white transition-colors">
                                Kontakt
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-10 flex flex-col md:flex-row md:items-center md:justify-between gap-2 text-xs text-neutral-500">
                    <span>© {currentYear} Pomocnik Skauta. Wszystkie prawa zastrzeżone.</span>
                    <div className="flex items-center gap-2">
                        <span>Autor:</span>
                        <a
                            href="https://gabryssv.tech"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-neutral-400 hover:text-white transition-colors"
                        >
                            Gabriel Kossakowski
                        </a>
                        <span className="text-neutral-600">·</span>
                        <a
                            href="https://www.facebook.com/1grybowskafse"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-neutral-400 hover:text-white transition-colors"
                        >
                            1. DG
                        </a>
                    </div>
                </div>
            </div>
        </motion.footer>
    )
}