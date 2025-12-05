import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { name: "Debugging", value: 35, color: "hsl(185, 40%, 60%)" },
  { name: "Googling Errors", value: 25, color: "hsl(200, 40%, 55%)" },
  { name: "Actual Coding", value: 15, color: "hsl(220, 30%, 50%)" },
  { name: "Coffee Breaks", value: 15, color: "hsl(180, 35%, 45%)" },
  { name: "Existential Crisis", value: 10, color: "hsl(210, 25%, 40%)" },
];

const DistributionChart = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="glass-soft frosted-border rounded-2xl p-6"
    >
      <h4 className="font-medium text-center mb-4 flex items-center justify-center gap-2">
        <span className="text-primary font-mono">P(X)</span>
        Distribution of Me
      </h4>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              paddingAngle={3}
              dataKey="value"
              animationBegin={0}
              animationDuration={800}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(220, 10%, 12%)",
                border: "1px solid hsl(0, 0%, 100%, 0.1)",
                borderRadius: "8px",
                fontSize: "12px",
              }}
              formatter={(value: number) => [`${value}%`, ""]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-2 mt-4">
        {data.map((item) => (
          <div key={item.name} className="flex items-center gap-2 text-xs">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-muted-foreground truncate">{item.name}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default DistributionChart;
