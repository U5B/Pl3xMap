package net.pl3x.map.api.markers;

import com.google.gson.JsonElement;
import net.pl3x.map.api.JsonArrayWrapper;
import net.pl3x.map.api.JsonSerializable;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;

/**
 * Represents a point on the map.
 */
public class Point implements JsonSerializable {
    public static final Point ZERO = new Point(0, 0);

    private int x;
    private int z;

    /**
     * Create a new point.
     *
     * @param x x coordinate
     * @param z z coordinate
     */
    public Point(int x, int z) {
        this.x = x;
        this.z = z;
    }

    public static Point of(int x, int z) {
        return new Point(x, z);
    }

    public static Point of(double x, double z) {
        return of((int) Math.floor(x), (int) Math.floor(z));
    }

    /**
     * Get the x coordinate.
     *
     * @return x coordinate
     */
    public int getX() {
        return this.x;
    }

    /**
     * Set the x coordinate.
     *
     * @param x x coordinate
     * @return this point
     */
    @NotNull
    public Point setX(int x) {
        this.x = x;
        return this;
    }

    /**
     * Get the z coordinate.
     *
     * @return z coordinate
     */
    public int getZ() {
        return this.z;
    }

    /**
     * Set the z coordinate.
     *
     * @param z z coordinate
     * @return this point
     */
    @NotNull
    public Point setZ(int z) {
        this.z = z;
        return this;
    }

    @Override
    @NotNull
    public JsonElement toJson() {
        JsonArrayWrapper wrapper = new JsonArrayWrapper();
        wrapper.add(getX());
        wrapper.add(getZ());
        return wrapper.getJsonArray();
    }

    @Override
    public boolean equals(@Nullable Object o) {
        if (this == o) {
            return true;
        }
        if (o == null) {
            return false;
        }
        if (this.getClass() != o.getClass()) {
            return false;
        }
        Point other = (Point) o;
        return getX() == other.getX() && getZ() == other.getZ();
    }

    @Override
    public int hashCode() {
        int prime = 1543;
        int result = 1;
        result = prime * result + getX();
        result = prime * result + getZ();
        return result;
    }

    @Override
    public String toString() {
        return "Point{x=" + getX() + ",z=" + getZ() + "}";
    }
}
