import { Link } from "wouter";
import { useStore } from "@/lib/store";
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, Apple, CreditCard } from "lucide-react";

export function Footer() {
    const { locale } = useStore();
    const isRTL = locale === 'ar';

    const footerSections = [
        {
            title: isRTL ? 'حول وصلة' : 'About Waslah',
            links: [
                { label: isRTL ? 'من نحن' : 'About Us', href: '/about' },
                { label: isRTL ? 'اتصل بنا' : 'Contact Us', href: '/contact' },
                { label: isRTL ? 'الوظائف' : 'Careers', href: '/careers' },
                { label: isRTL ? 'المدونة' : 'Blog', href: '/blog' },
            ]
        },
        {
            title: isRTL ? 'الخدمات' : 'Services',
            links: [
                { label: isRTL ? 'إنشاء متجر' : 'Create Store', href: '/auth/register' },
                { label: isRTL ? 'الأسعار' : 'Pricing', href: '/pricing' },
                { label: isRTL ? 'حلول الدفع' : 'Payment Solutions', href: '/payments' },
                { label: isRTL ? 'حلول الشحن' : 'Shipping Solutions', href: '/shipping' },
            ]
        },
        {
            title: isRTL ? 'الدعم' : 'Support',
            links: [
                { label: isRTL ? 'مركز المساعدة' : 'Help Center', href: '/help' },
                { label: isRTL ? 'الأسئلة الشائعة' : 'FAQ', href: '/faq' },
                { label: isRTL ? 'الشروط والأحكام' : 'Terms & Conditions', href: '/terms' },
                { label: isRTL ? 'سياسة الخصوصية' : 'Privacy Policy', href: '/privacy' },
            ]
        },
        {
            title: isRTL ? 'تابعنا' : 'Follow Us',
            links: [
                { label: isRTL ? 'فيسبوك' : 'Facebook', href: '#', icon: Facebook },
                { label: isRTL ? 'تويتر' : 'Twitter', href: '#', icon: Twitter },
                { label: isRTL ? 'إنستغرام' : 'Instagram', href: '#', icon: Instagram },
                { label: isRTL ? 'يوتيوب' : 'YouTube', href: '#', icon: Youtube },
            ]
        }
    ];

    return (
        <footer className="bg-[#1a1a2e] text-white border-t border-white/5">
            {/* Main Footer Content */}
            <div className="container-width py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                    {/* Brand Column - Takes 1 column */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Logo */}
                        <Link href="/" className="inline-block group">
                            <img
                                src="/logo.png"
                                alt="Waslah"
                                className="h-20 w-auto transition-transform group-hover:scale-105"
                            />
                        </Link>

                        <p className="text-sm text-[#999999] leading-relaxed">
                            {isRTL
                                ? 'منصة التجارة الإلكترونية الرائدة التي تمكنك من إنشاء متجرك الإلكتروني والبدء في البيع خلال دقائق'
                                : 'The leading e-commerce platform that enables you to create your online store and start selling in minutes'}
                        </p>

                        {/* Social Media Icons */}
                        <div className="flex items-center gap-3">
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#6ab8f7] flex items-center justify-center transition-all duration-300 hover:scale-110">
                                <Facebook className="h-4 w-4" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#6ab8f7] flex items-center justify-center transition-all duration-300 hover:scale-110">
                                <Twitter className="h-4 w-4" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#6ab8f7] flex items-center justify-center transition-all duration-300 hover:scale-110">
                                <Instagram className="h-4 w-4" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#6ab8f7] flex items-center justify-center transition-all duration-300 hover:scale-110">
                                <Youtube className="h-4 w-4" />
                            </a>
                        </div>
                    </div>

                    {/* Link Columns - Takes 4 columns */}
                    {footerSections.map((section, idx) => (
                        <div key={idx} className="space-y-4">
                            <h4 className="font-bold text-base text-[#999999] uppercase tracking-wider">
                                {section.title}
                            </h4>
                            <ul className="space-y-3">
                                {section.links.map((link, linkIdx) => {
                                    // @ts-ignore - straightforward fix for mixed link types in footer config
                                    const Icon = link.icon;
                                    return (
                                        <li key={linkIdx}>
                                            <Link
                                                href={link.href}
                                                className={`text-sm text-[#999999] hover:text-white inline-flex items-center gap-2 transition-all duration-200 ${isRTL ? 'hover:-translate-x-1' : 'hover:translate-x-1'}`}
                                            >
                                                {Icon && <Icon className="h-4 w-4" />}
                                                {link.label}
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Payment Methods */}
                <div className="mt-12 pt-8 border-t border-white/10">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="text-center md:text-start">
                            <p className="text-sm text-[#999999] mb-3">
                                {isRTL ? 'طرق الدفع المتاحة' : 'Available Payment Methods'}
                            </p>
                            <div className="flex items-center gap-3 flex-wrap justify-center md:justify-start">
                                <div className="w-12 h-8 bg-white/10 rounded flex items-center justify-center hover:bg-white/20 transition-colors">
                                    <CreditCard className="h-5 w-5 text-white/70" />
                                </div>
                                <div className="w-12 h-8 bg-white/10 rounded flex items-center justify-center hover:bg-white/20 transition-colors">
                                    <span className="text-xs font-bold text-white/70">MADA</span>
                                </div>
                                <div className="w-12 h-8 bg-white/10 rounded flex items-center justify-center hover:bg-white/20 transition-colors">
                                    <Apple className="h-5 w-5 text-white/70" />
                                </div>
                                <div className="w-12 h-8 bg-white/10 rounded flex items-center justify-center hover:bg-white/20 transition-colors">
                                    <span className="text-xs font-bold text-white/70">STC</span>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>

            {/* Bottom Copyright Bar */}
            <div className="border-t border-white/5 bg-black/20">
                <div className="container-width py-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[#999999]">
                        <p>
                            {isRTL
                                ? `© ${new Date().getFullYear()} وصلة. جميع الحقوق محفوظة`
                                : `© ${new Date().getFullYear()} Waslah. All rights reserved`}
                        </p>
                        <div className="flex items-center gap-6 order-2 md:order-none">
                            <a href="mailto:info@waslah.com" dir="ltr" className="hover:text-white transition-colors inline-flex items-center gap-2">
                                <Mail className="h-4 w-4" />
                                info@waslah.com
                            </a>
                            <a href="tel:+966XXXXXXXX" dir="ltr" className="hover:text-white transition-colors inline-flex items-center gap-2">
                                <Phone className="h-4 w-4" />
                                <span dir="ltr">+966 50 000 0000</span>
                            </a>
                        </div>
                        <div className="flex items-center gap-6 order-3 md:order-none">
                            <Link href="/terms" className="hover:text-white transition-colors">
                                {isRTL ? 'الشروط والأحكام' : 'Terms'}
                            </Link>
                            <Link href="/privacy" className="hover:text-white transition-colors">
                                {isRTL ? 'الخصوصية' : 'Privacy'}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
