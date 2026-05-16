import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Clock, MoreVertical, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Artifact } from "../context/workspace-context";

interface ArtifactCardProps {
  artifact: Artifact;
}

export function ArtifactCard({ artifact }: ArtifactCardProps) {
  return (
    <Card className="group hover:border-zds-blue-400/40 transition-all duration-300 hover:shadow-premium bg-white">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 p-5">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-zds-neutral-900 rounded-zds-100 text-zds-blue-400 group-hover:bg-zds-blue-700/30 transition-colors">
            <FileText size={18} />
          </div>
          <div>
            <CardTitle className="text-base font-bold text-zds-neutral-200 line-clamp-1 group-hover:text-zds-blue-400 transition-colors">
              {artifact.title}
            </CardTitle>
            <p className="text-[10px] text-zds-neutral-500 font-medium uppercase tracking-wider mt-1">
              {artifact.type}
            </p>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="size-8 text-zds-neutral-400">
          <MoreVertical size={16} />
        </Button>
      </CardHeader>
      
      <CardContent className="px-5 py-0">
        <div className="flex flex-wrap gap-1.5">
          {artifact.tags.map((tag) => (
            <span key={tag} className="text-[10px] font-bold text-zds-blue-400/70 bg-zds-blue-700/10 px-1.5 py-0.5 rounded-sm">
              {tag}
            </span>
          ))}
        </div>
      </CardContent>

      <CardFooter className="p-5 flex items-center justify-between mt-2 border-t border-zds-neutral-900/50">
        <div className="flex items-center gap-2 text-zds-neutral-400">
          <Clock size={12} />
          <span className="text-[10px] font-medium">{artifact.updatedAt}</span>
        </div>
        
        <div className="flex items-center gap-2">
           <Badge variant={artifact.status === 'stable' ? 'default' : 'secondary'} className="text-[9px] h-5">
             {artifact.status}
           </Badge>
           <Button variant="ghost" size="icon" className="size-6 text-zds-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
              <ExternalLink size={14} />
           </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
