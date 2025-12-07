import { useEffect, useState } from "react";
import { api } from "@/services/api";
import { motion } from "framer-motion";
import { Terminal, Calendar, ArrowRight } from "lucide-react";
import { useInView } from "framer-motion";
import { useRef } from "react";

const NotesSection = () => {
    const [notes, setNotes] = useState<any[]>([]);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    useEffect(() => {
        api.getNotes().then(setNotes).catch(console.error);
    }, []);

    return (
        <div className="container mx-auto px-6 relative" ref={ref}>
            <motion.div
                className="flex items-center gap-3 mb-12 justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
            >
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-border/50" />
                <h2 className="text-sm font-mono text-muted-foreground uppercase tracking-widest">
                    Dev Logs
                </h2>
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-border/50" />
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {notes.length === 0 ? (
                    <div className="col-span-full p-8 rounded-2xl bg-card/30 frosted-border text-center text-muted-foreground font-mono text-sm">
                        <Terminal className="w-8 h-8 mx-auto mb-4 opacity-50" />
                        <p>No logs found. Initiating thought process...</p>
                    </div>
                ) : (
                    notes.map((note, index) => (
                        <motion.div
                            key={note._id}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 hover:border-primary/40 transition-all group"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="text-xs font-mono text-muted-foreground flex items-center gap-2">
                                    <Calendar className="w-3 h-3" />
                                    {new Date(note.createdAt).toLocaleDateString()}
                                </div>
                                <div className="p-1 rounded bg-primary/10 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                                    <ArrowRight className="w-3 h-3" />
                                </div>
                            </div>
                            <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">{note.title}</h3>
                            <div className="text-sm text-muted-foreground line-clamp-3 mb-4 prose prose-invert">
                                {note.content}
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {note.tags?.map((tag: string) => (
                                    <span key={tag} className="text-[10px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-muted-foreground">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))
                )}
            </div>
        </div>
    );
};

export default NotesSection;
