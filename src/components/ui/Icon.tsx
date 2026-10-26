import {
  Activity, Award, Bot, Boxes, Brain, ChartLine, Clock, Cloud, CodeXml, Compass, Container, Cpu, Database, Eye,
  Factory, FileCheck, Gauge, GitBranch, Globe, GraduationCap, Handshake, HeartPulse, KeyRound, Landmark, Layers,
  Lightbulb, Lock, Map, MessageSquare, Mic, Network, Plug, RadioTower, RefreshCw, Rocket, Scale, Search, Server,
  Shield, ShoppingCart, Smartphone, Sparkles, Target, TestTubeDiagonal, Truck, Users, Workflow, Wrench, Zap,
  type LucideIcon, type LucideProps,
} from "lucide-react";
import type { IconName } from "@/types/content";

const icons: Record<IconName, LucideIcon> = {
  cloud: Cloud, server: Server, workflow: Workflow, brain: Brain, shield: Shield, globe: Globe,
  smartphone: Smartphone, database: Database, code: CodeXml, testTube: TestTubeDiagonal, compass: Compass,
  layers: Layers, gitBranch: GitBranch, container: Container, boxes: Boxes, lock: Lock, activity: Activity,
  cpu: Cpu, sparkles: Sparkles, bot: Bot, messageSquare: MessageSquare, mic: Mic, lineChart: ChartLine, zap: Zap,
  plug: Plug, rocket: Rocket, target: Target, users: Users, handshake: Handshake, award: Award, landmark: Landmark,
  heartPulse: HeartPulse, shoppingCart: ShoppingCart, radioTower: RadioTower, truck: Truck,
  graduationCap: GraduationCap, factory: Factory, lightbulb: Lightbulb, search: Search, fileCheck: FileCheck,
  refresh: RefreshCw, eye: Eye, key: KeyRound, network: Network, gauge: Gauge, wrench: Wrench, map: Map,
  clock: Clock, scale: Scale,
};

export function Icon({ name, ...props }: { name: IconName } & LucideProps) {
  const Cmp = icons[name];
  return <Cmp aria-hidden="true" strokeWidth={1.75} {...props} />;
}
